from flask import Flask,jsonify,request, session, make_response
import pymongo
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
import jwt
import bcrypt
from functools import wraps
from datetime import datetime, timedelta
import json



load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SESSION_TYPE'] = 'memcached'
app.config['SECRET_KEY'] = 'the.mass_key+added:for"security?purpose'
sess = Session()


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
            return jsonify({'Alert!':"Ivalid Token"})
        return func(user_credential ,*args, **kwargs)
    return decorated


mongo_server = pymongo.MongoClient("mongodb://localhost:27017")
# Users Database
users = mongo_server['users']
users_list = users['users_list']
products_list = users['products_list']
cart_list = users['cart_list']

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
            
            return make_response({'success':True, 'Token':token.decode('utf-8')}), 200
        else:
            return make_response({'success':False, 'msg':'Password Entered is Incorrect'}), 401
    else:
        return make_response({'success':False, 'msg':'Username not found'}),404

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
        'Subscription': None
        })
    return jsonify({'success':True}), 201

@app.route("/view_users")
@token_required
def view_users(user_credential):
    if user_credential['userType'] == "Admin":
        users = list(users_list.find({},{"_id":0, "Password":0}))
        return jsonify({'users':users})
    return jsonify({"msg":"Invalid Access"})
    
@app.route('/products',methods=['GET'])
def products():
    products = list(products_list.find({},{'_id':0}))
    if products:
        return jsonify({'success':True,'products':products})
    else:
        return jsonify({'success':False})
    
@app.route('/add_product',methods=['POST'])
@token_required
def add_product(user_credential):
    if user_credential['userType']=="Seller":
        data = request.get_json()
        product_name = data['product_name']
        product_price = data['product_price']
        product_url = data['product_url']
        product_mrp = data['product_mrp']
        product_seller = data['product_seller']
        latest_id = products_list.find_one(sort=[('Product_Id', -1)])
        id = int(latest_id['Product_Id']) + 1 if latest_id else 1
        products_list.insert_one({
                'Product_Id':id,'Product_Name':product_name,
                'Product_Price':product_price,'Product_url':product_url ,
                'Product_mrp':product_mrp,'Product_seller':product_seller
                })
        return jsonify({'success':True,'message':'Product Added Successfully'})
    else:
        return jsonify({"msg":"Access Denaied"}),401
    
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



@app.get('/product/<id>')
def cur_product(id):
    product = products_list.find_one({'Product_Id':int(id)},{'_id':0})
    return jsonify({'product_data':product})

if __name__=='__main__':
    app.run(debug=True)