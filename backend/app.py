#Run these commands in a terminal to start flask app in this directory
"""set FLASK_ENV="development" FLASK_DEBUG=1
(reloads flask automatically when changes are made to this file)"""
#set FLASK_APP=app.py
#flask run

from bson.objectid import ObjectId
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, ReturnDocument
from bson.json_util import dumps
import re

app = Flask(__name__)
CORS(app)

# Set up connection to MongoDB
client = MongoClient("mongodb+srv://abhay:abhay123@reactflask.sbhxzds.mongodb.net/?retryWrites=true&w=majority")
db = client['reactflaskdb']
login_collection = db['idpwd']
troubleshooting_collection = db['Troubleshooting']
issue_collection = db['db'] 

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']
    user = login_collection.find_one({"username": username, "password": password})
    if user:
        # Convert MongoDB document to JSON and return
        return dumps({'success': True})
    else:
        return dumps({'success': False})

@app.route('/submit-data', methods=['POST'])
def submit_data():
    data = request.json
    user = troubleshooting_collection.find_one({"case":data['case']})
    # print(user)
    if user != None:
        if user['sol'] != "":
            return jsonify({'success':False,'message':'Flow of this case Id is already exist check dashboard'})
        else:
            r = re.sub("_"," ",user['issues'])
            if len(user['questionResponse']) == 0:
                return jsonify({'success':True,'id':0,'issue':r})
            else:
                que = issue_collection.find_one({})
                value = que[r]
                cur = 0
                k = 0
                res = user['questionResponse']
                i = 0
                while i < len(value) and k<len(res):
                    if value[i]['Que'] == list(res[k].keys())[0]:
                        cur = value[i]['options'][list(res[k].values())[0]][1]
                        i = cur
                        k += 1
                return jsonify({'success':True,'id':i,'issue':r})
    elif  user == None:
        troubleshooting_collection.insert_one(data)
        return jsonify({'success': True,'id':0,'issue':''})
    
    return jsonify({'success':False})
@app.route('/get-data')
def get_data():
    data = issue_collection.find()
    data_json = dumps(data)
    return data_json

@app.route('/getCase/<string:id>')
def getCase(id):
    data = troubleshooting_collection.find_one({"case":id})
    id = data['_id']
    data_json = {'id':str(id)}
    return jsonify(data_json)


@app.route('/user/<string:id>',methods=['POST'])
def update_Case(id):
    updateObject = request.get_json()
    jsonify(updateObject)
    print(updateObject)
    result = troubleshooting_collection.find_one_and_update({"case":id},{"$set":updateObject},return_document=ReturnDocument.AFTER)
    return 'case Update'