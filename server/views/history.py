from flask.views import MethodView
from flask import request, jsonify
from bson import ObjectId
from models.historyModel import historyModel  # call model file
# from bson.objectid import ObjectId # Allow using ObjectId
# from factory.adafruit import ADA


history = historyModel()
ada = 'ADA()'
class historyAPI(MethodView):
    def get(self):
        return jsonify(history.find({})), 200
        
