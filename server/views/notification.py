from flask.views import MethodView
from flask import request, jsonify
from bson import ObjectId
from models.notificationModel import notificationModel  # call model file
# from bson.objectid import ObjectId # Allow using ObjectId
# from factory.adafruit import ADA


notification = notificationModel()
ada = 'ADA()'
class notificationAPI(MethodView):
    def get(self):
        return jsonify(notification.find({})), 200
        
