from flask.views import MethodView
from flask import request, jsonify
from models.userModel import userModel  # call model file
# from bson.objectid import ObjectId # Allow using ObjectId


from flask_jwt_extended import create_access_token

user = userModel()
class UserAPI(MethodView):
    def get(self):
        
        user_id = request.args.get('user_id')
        # return "user" + str((user_id))
        # return "find user" + str(user_id)
        return user.find_by_id(str(user_id)), 200

    def post(self, action):
       
        if action == "login":
            data = request.get_json(force=True)
            
            username = data["username"]
            password = data["password"]
            if user.find({'username': username, 'password': password}):
                access_token = create_access_token(identity=username)
                return jsonify(access_token=access_token), 201
            else:
                return "User not found", 404
            # return "Create", 201
        elif action == "create":
            username = data["username"]
            password = data["password"]
            print("create user")
            return user.create({'username': username, 'password': password, 'permission': "0"}), 201
        elif action == 'add-to-home':
            username = data["username"]
            newUser = user.find({'username': username})
            # print(newUser)
            return user.update(newUser[0]['_id'], {'username': username, 'permission': "1"}), 201
            return "add user", 201
            # return user.update()
        elif action == 'delete-from-home':
            username = data["username"]
            newUser = user.find({'username': username})
            # print(newUser)
            return user.update(newUser[0]['_id'], {'username': username, 'permission': "0"}), 201
        else:
            return "Invalid Action", 404
        # name = request.form['name']
        # response = user.create({'name': name})
        # return response, 201