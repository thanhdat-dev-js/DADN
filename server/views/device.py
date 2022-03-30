from flask.views import MethodView
from flask import request, jsonify
from models.deviceModel import deviceModel  # call model file
# from bson.objectid import ObjectId # Allow using ObjectId
device = deviceModel()
class deviceAPI(MethodView):
    def get(self):
        device_id = request.args.get('device_id')
        if device_id == None:
            # return "device"
            return jsonify(device.find({})), 200
        # return "device" + str((device_id))
        # return "find device" + str(device_id)
        return device.find_by_id(str(device_id)), 200

    def post(self):
        name = request.form['name']
        response = device.create({'name': name})
        return response, 201