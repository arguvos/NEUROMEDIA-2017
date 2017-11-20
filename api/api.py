#!/usr/bin/env python3
from flask import Flask
from flask_pymongo import PyMongo

@app.route('/api/1.0/authorization', methods=['POST'])
def authorization():
    online_users = mongo.db.users.find({})
    return render_template('index.html')

app = Flask(__name__)
mongo = PyMongo(app)
