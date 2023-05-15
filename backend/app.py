from flask import Flask,jsonify,request, make_response
import pymongo
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
import jwt
import bcrypt
from functools import wraps
from datetime import datetime, timedelta
import json
import random

import functions

load_dotenv()

#configuring Application
app = Flask(__name__)
CORS(app)
app.config['SESSION_TYPE'] = 'memcached'
app.config['SECRET_KEY'] = 'the.mass_key+added:for"security?purpose'
sess = Session()

#Creating Token 
def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers['token']
        if not token:
            return jsonify({'Alert!':"The Token is missing"})
        try:
            data_load = jwt.decode(token, app.config['SECRET_KEY'])
            user_credential = users_list.find_one({'Name': data_load['name']},{'_id':0})
        except:
            return jsonify({'Alert!':"Ivalid Token"}),401
        return func(user_credential ,*args, **kwargs)
    return decorated

#Database
mongo_server = pymongo.MongoClient("mongodb://localhost:27017")
users = mongo_server['users']
users_list = users['users_list']
products_list = users['products_list']
cart_list = users['cart_list']
otp_list = users['otp_list']

#Login API
@app.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    user = users_list.find_one({
        '$or': [
        {'Name': data['name']},
        {'Email': data['name']},
        {'Phone': data['name']}
        ]
    }, {'_id': 0})
    password = data['password']
    if user is not None:
        if (bcrypt.checkpw(password.encode('utf-8'), user['Password'])):
            token = jwt.encode({
            'name': user['Name'],
            'exp' : datetime.utcnow() + timedelta(minutes = 30)
        }, app.config['SECRET_KEY'])
            users_list.update_one({"Name":user['Name']},{"$set":{
                "Last_Login":datetime.utcnow()}
            })
            
            return make_response({'success':True, 'Token':token.decode('utf-8')}), 200
        else:
            return make_response({'success':False, 'msg':'Password Entered is Incorrect'}), 401
    else:
        return make_response({'success':False, 'msg':'Username not found'}),404

# New User API
@app.route('/create_users',methods=['POST'])
def createusers():
    data = request.get_json()
    name = data['name']
    email = data['email']
    phone = data['phone']
    password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    latest_id = users_list.find_one(sort=[('User_Id', -1)])
    id = int(latest_id['User_Id']) + 1 if latest_id else 1
    if users_list.find_one({'Name':name}):
        return jsonify({"msg":"UserName Already Exist"})
    if users_list.find_one({'Email':email}):
        return jsonify({"msg":"Email Already Exist"})
    if users_list.find_one({'Phone':phone}):
        return jsonify({"msg":"Phone Number Already Exist"})
    users_list.insert_one({
        'User_Id':id,
        'Name':name, 'Password':password,
        'Email':email, 'Phone':phone,
        'userType':'User', 'Created_on':datetime.utcnow(),
        'Subscription': None,
        'Email_Verification':False
        })
    return jsonify({'success':True}), 201

#View user API
@app.route("/view_users")
@token_required
def view_users(user_credential):
    if user_credential['userType'] == "Admin":
        users = list(users_list.find({"userType":"User"},{"_id":0, "Password":0}))
        return jsonify({'users':users})
    return jsonify({"msg":"Invalid Access"})

# Vies Sellers API
@app.route("/view_sellers")
@token_required
def view_seller(user_credential):
    if user_credential['userType'] == "Admin":
        users = list(users_list.find({"userType":"Seller"},{"_id":0, "Password":0}))
        return jsonify({'users':users})
    return jsonify({"msg":"Invalid Access"})

# Products API    
@app.route('/products',methods=['GET'])
def products():
    products = list(products_list.find({},{'_id':0}))
    if products:
        return jsonify({'success':True,'products':products})
    else:
        return jsonify({'success':False})

# Add Product API    
@app.route('/add_product',methods=['POST'])
@token_required
def add_product(user_credential):
    if user_credential['userType']=="Seller":
        data = request.get_json()
        product_name = data['product_name']
        product_price = data['product_price']
        product_url = data['product_url']
        product_mrp = data['product_mrp']
        product_description = data['product_description']
        product_quantity = data['product_quantity']
        latest_id = products_list.find_one(sort=[('Product_Id', -1)])
        id = int(latest_id['Product_Id']) + 1 if latest_id else 1
        products_list.insert_one({
                'Product_Id':id,'Product_Name':product_name, 'Product_Price':product_price, 'Product_url':product_url , 'Product_mrp':product_mrp,
                'Product_seller':user_credential['Shop_Name'], 'Created_On':datetime.utcnow(), 'Modified_On':datetime.utcnow(), 'Description': product_description, 
                'Quantity':int(product_quantity)
                })
        return jsonify({'success':True,'msg':'Product Added Successfully'})
    else:
        return jsonify({"msg":"Access Denaied"}),401
    
# Conver To Seller API
@app.post('/convert_to_seller/<int:userid>')
@token_required
def convert_to_seller(user_credential, userid):
    if user_credential['userType']=="Admin":
        data = request.get_json()
        user_find = users_list.find_one({'User_Id':userid})
        if user_find['userType']=="Seller":
            return jsonify({"msg":"The seller {} is already Register".format(user_find['Shop_Name'])})
        elif user_find is not None:
            shop_name = data['Shop_Name']
            shop_type = data['Shop_Type']
            shop_Address = data['Shop_Address']
            users_list.update_one({'User_Id':user_find['User_Id']}, 
                                  {'$set':{'Shop_Name':shop_name, "Shop_Type":shop_type,
                                           "Shop_Address":shop_Address ,"userType":"Seller", 
                                           "Upgraded_Time":datetime.utcnow(), 
                                           "Verified_by":user_credential['Name']}
                                           })
            return jsonify({'user_details':users_list.find_one({'User_Id':userid},{'_id':0,'Password':0}) , 'msg':'User Upgraded to seller'})
        else :
            return jsonify({'msg':"The Given User Id not Found"})
    else:
        return jsonify({"msg":"Access Denied"}),401

# Product Detail with API
@app.get('/product/<id>')
def cur_product(id):
    product = products_list.find_one({'Product_Id':int(id)},{'_id':0})
    return jsonify({'product_data':product})

# Generate Otp for Password change through Email
@app.post('/get_mail_for_otp')
def change_password_mail_otp():
    data = request.get_json()
    user = users_list.find_one({
        '$or': [
        {'Name': data['name']},
        {'Email': data['name']},
        {'Phone': data['name']}
        ]
    }, {'_id': 0})
    user_email = user['Email']
    if user:
        otp = str(random.randint(100000, 999999))
        functions.send_mail_for_otp(user_email, otp)
        users_list.update_one({'Email':user_email},{'$set':{ 'otp':bcrypt.hashpw(otp.encode('utf-8'), bcrypt.gensalt()), 
                                                            'otp_expire':datetime.utcnow()+timedelta(minutes=1)}})
        return jsonify({"msg":"OTP send to Email"})
    return ({"msg":"user details not found"})

# Verify otp for chnging Password through Email smtp
@app.post('/check_otp')
def check_otp():
    data = request.get_json()
    entered_otp = data['otp']
    user_mail = data['email']
    otp_detail = users_list.find_one({'Email':user_mail},{'_id':0})
    if (bcrypt.checkpw(entered_otp.encode('utf-8'), otp_detail['otp'])):
        if datetime.utcnow() <= otp_detail['otp_expire']:
            return jsonify({"msg":"Otp is Valid"})
        else:
            return jsonify({'msg':"Otp expired"})
    else:
        return jsonify({"msg":"Otp incorrect"})

#change Password
@app.post('/change_password')
def change_password():
    data = request.get_json()
    email = data['email']
    password = bcrypt.hashpw(data['new_password'].encode('utf-8'), bcrypt.gensalt())
    users_list.update_one({'Email':email}, {'$set':{'Password':password, 'Updated_on':datetime.utcnow()}})
    return jsonify({'msg':"Password changed Successfully"})    

#Verify Email 3 mins for Verification
@app.get('/confirm_email')
@token_required
def confirn_email(user_credential):
    if user_credential['Email_Verification'] == False:
        otp = str(random.randint(100000, 999999))
        functions.send_mail_for_verify(user_credential['Email'], otp)
        users_list.update_one({'Email':user_credential['Email']},{'$set':{ 'otp':bcrypt.hashpw(otp.encode('utf-8'), bcrypt.gensalt()), 
                                                            'otp_expire':datetime.utcnow()+timedelta(minutes=3)}})
        return jsonify({"msg":"OTP send to Email"})
    return ({"msg":"user details not found"})

# Confirmation email by otp
@app.post('/cofirmation_email_by_otp')
@token_required
def confirm_mail_by_otp(user_credential):
    data = request.get_json()
    entered_otp = data['otp']
    otp_detail = users_list.find_one({'Email':user_credential['Email']},{'_id':0})
    if (bcrypt.checkpw(entered_otp.encode('utf-8'), otp_detail['otp'])):
        if datetime.utcnow() <= otp_detail['otp_expire']:
            users_list.update_one({'Email':user_credential['Email']},{'$set':{'Email_Verification':True}})
            return jsonify({"msg":"Otp is Valid", 'Verify':"Email Verified Successfully"})
        else:
            return jsonify({'msg':"Otp expired"})
    else:
        return jsonify({"msg":"Otp incorrect"})

#Running the App
if __name__=='__main__':
    app.run(debug=True)