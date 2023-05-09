from flask import Flask, request, jsonify, make_response
import bcrypt
import pymongo
import jwt
from functools import wraps
from datetime import datetime, timedelta

app=Flask(__name__)
app.config['SECRET_KEY'] = 'the.mass_key+added:for"security?purpose'

mongo_server = pymongo.MongoClient("mongodb://localhost:27017")
users = mongo_server['jwt_server']
tb_user = users['users']

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers['token']
        if not token:
            return jsonify({'Alert!':"The Token is missing"})
        try:
            data_load = jwt.decode(token, app.config['SECRET_KEY'])
            user_credential = tb_user.find_one({'Name': data_load['name']},{'_id':0})
        except:
            return jsonify({'Alert!':"Ivalid Token"})
        return func(user_credential ,*args, **kwargs)
    return decorated

@app.post('/login')
def login():
    auth = request.authorization
    user = tb_user.find_one({'Name':auth['username']})
    if user:
        check_password = bcrypt.checkpw(auth['password'].encode('utf-8'), user['password'])
        if check_password:
            token = jwt.encode({
            'name': user['Name'],
            'exp' : datetime.utcnow() + timedelta(minutes = 30)
        }, app.config['SECRET_KEY'])
            return make_response({'success':True, 'msg':'Login Successful', 'Token':token.decode('utf-8')}), 200
        else:
            return make_response({'success':False, 'msg':'Password Entered is Incorrect'}), 401
    else:
        return make_response({'success':False, 'msg':'Username not found'}),404

@app.get('/games')
@token_required
def games(user_credential):
    return jsonify({'Games':'Pubg'})

@app.post('/add_user')
def add_user():
    data = request.get_json()
    name = data['username']
    password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    tb_user.insert_one({'Name':name, 'password':password})
    return jsonify({'name':name})

if __name__=="__main__":
    app.run(debug=True)