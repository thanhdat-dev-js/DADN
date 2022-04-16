from flask.views import MethodView
from flask import request, jsonify
from bson import ObjectId
from models.deviceModel import deviceModel  # call model file
# from bson.objectid import ObjectId # Allow using ObjectId
from factory.adafruit import ADA


devices = deviceModel()
ada = ADA()
class deviceAPI(MethodView):
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
        print(device['name'], device['feed'])
        newvalue = "1" if device['feed'] == '0' else "0"
        ada.update('fan', newvalue)
        # if device['feed'] == 1:
        return device, 201