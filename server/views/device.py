from flask.views import MethodView
from flask import request, jsonify
from bson import ObjectId
from models.deviceModel import deviceModel  # call model file
# from bson.objectid import ObjectId # Allow using ObjectId
from factory.adafruit import ADA

from flask_jwt_extended import jwt_required

devices = deviceModel()
ada = ADA()
class deviceAPI(MethodView):
    # decorators = [jwt_required()]
    def get(self):
        device_id = request.args.get('device_id')
        if device_id == None:
            # return "device"
            return jsonify(devices.find({})), 200
        # return "device" + str((device_id))
        # return "find device" + str(device_id)

    def post(self):
        name = request.form['name']
        response = devices.create({'name': name})
        return response, 201

    def put(self, device_id):
        device = devices.find_by_id(ObjectId(device_id))
        value = request.form['value']
        print(device['name'], "with new value= " +str(value))
        # newvalue = "1" if device['feed'] == '0' else "0"
        ada.update(device['name'], value)
        # if device['feed'] == 1:
        return "update successfully",201