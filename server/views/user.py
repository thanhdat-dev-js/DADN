from flask.views import MethodView
from flask import request, jsonify
from models.user import userModel  # call model file
# from bson.objectid import ObjectId # Allow using ObjectId
user = userModel()
class UserAPI(MethodView):
    def get(self):
        
        user_id = request.args.get('user_id')
        # return "user" + str((user_id))
        # return "find user" + str(user_id)
        return user.find_by_id(str(user_id)), 200

    def post(self):
        name = request.form['name']
        response = user.create({'name': name})
        return response, 201