from flask import Flask, request, jsonify
# from models import todo  # call model file
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager

from views.device import deviceAPI
from views.user import UserAPI

app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "DADN"
jwt = JWTManager(app)

user_view = UserAPI.as_view('user_api')
device_view = deviceAPI.as_view('device_api')

# app.add_url_rule('/users', view_func=user_view, methods=['GET',])
app.add_url_rule('/users/<string:action>', view_func=user_view, methods=['POST',])

app.add_url_rule('/devices', view_func=device_view, methods=['GET',])
# Thay đổi trạng thái của thiết bị có _id là device_id
app.add_url_rule('/devices/<string:device_id>', view_func=device_view, methods=['PUT',])
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)