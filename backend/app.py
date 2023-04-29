from flask import Flask,jsonify,request, session
import pymongo
from flask_cors import CORS
import os
from flask_session import Session
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SESSION_TYPE'] = 'memcached'
app.config['SECRET_KEY'] = 'super secret key'
sess = Session()

mongo_server = pymongo.MongoClient("mongodb://localhost:27017")
# Users Database
users = mongo_server['users']
users_list = users['users_list']
# Products Database
products = mongo_server['users']
products_list = products['products_list']
cart_list = products['cart_list']

@app.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    if data['name']==None or data['name']==""  :
        return jsonify({'success': False, 'message': 'Name is required.'})
    if  data['password']==None or data['password']=="":
        return jsonify({'success': False, 'message': 'Password is required.'})
    user = users_list.find_one({'Name': data['name'], 'Password': data['password']},{'_id':0})
    if user is None:
        return jsonify({'success': False, 'message': 'Invalid Name or Password.'})
    return jsonify({'success':True, 'User':user})

@app.route('/create_users',methods=['POST'])
def createusers():
    data = request.get_json()
    if 'username' not in data or 'password' not in data:
        return jsonify({'success': False, 'message': 'For creating account you need username and password'})
    else:
        users_list.insert_one({'Name':data['username'],'Password':data['password']})
        return jsonify({'success': True, 'message': 'Account created Successfully'})
    
@app.route('/products',methods=['GET'])
def products():
    products = list(products_list.find({},{'_id':0}))
    # print(products)
    if products:
        return jsonify({'success':True,'products':products})
    else:
        return jsonify({'success':False})
    
@app.route('/add_product',methods=['POST'])
def add_product():
    data = request.get_json()
    product_name = data['product_name']
    product_price = data['product_price']
    latest_id = products_list.find_one(sort=[('Product_Id', -1)])
    id = int(latest_id['Product_Id']) + 1 if latest_id else 1
    products_list.insert_one({'Product_Id':id,'Product_Name':product_name,'Product_Price':product_price})
    return jsonify({'success':True,'message':'Product Added Successfully'})

@app.route('/delete_product/<id>',methods=['DELETE'])
def delete_product(id):
    products_list.delete_one({'Product_Id':int(id)})
    return jsonify({'success':True,'message':'Product Deleted successfully'})


# Carts API's
@app.route('/cart',methods=['GET'])
def cart():
    cart_products = list(cart_list.find({'User_Id':session['User_Id']},{'_Id':0}))
    if cart_products is None:
        return jsonify({'success':False})
    else:
        return jsonify({'success':True,'cart_products':cart_products})
    
@app.route('/cart/<id>',methods = ['POST'])
def add_to_cart(id):
    data = request.get_json()
    # Setting Quantity
    quantity = data['Quantity']
    existance = cart_list.find_one({'Product_Id':id,'User_Id':session['User_Id']})
    if existance:
        Cart_Id = existance['Cart_Id']
        existing_quantity = existance['Quantity']
        return jsonify({})
    else:
        Product_Id = id  #Product_Id
        # To find the New Cart Id
        latest_cart_id = products_list.find_one(sort=[('Cart_Id', -1)])
        Cart_Id = int(latest_cart_id['Cart_Id']) + 1 if latest_cart_id else 1
        # Cart Id fixed
        User_Id = session['User_Id']
        cart_list.insert_one({'Cart_Id':Cart_Id, 'User_Id':User_Id, 'Product_Id':Product_Id, 'Quantity':quantity})
        return jsonify({'success':True})
    
@app.get('/product/<id>')
def cur_product(id):
    product = products_list.find_one({'Product_Id':int(id)},{'_id':0})
    return jsonify({'product_data':product})

if __name__=='__main__':
    app.run(debug=True)