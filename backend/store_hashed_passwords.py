import bcrypt
from pymongo import MongoClient

# Set up connection to MongoDB
client = MongoClient("mongodb+srv://abhay:abhay123@reactflask.sbhxzds.mongodb.net/?retryWrites=true&w=majority")
db = client['reactflaskdb']
login_collection = db['idpwd']

def register_user(username, password):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user = {
        'username': username,
        'password': hashed_password
    }
    login_collection.insert_one(user)
    print('User registered successfully.')

def main():
    username = input('Enter username: ')
    password = input('Enter password: ')
    register_user(username, password)

if __name__ == '__main__':
    main()
