from flask import Flask, request, jsonify
# from models import todo  # call model file
from flask_cors import CORS

from views.device import deviceAPI  # to avoid cors error in different frontend like react js or any other
from views.user import UserAPI

app = Flask(__name__)
CORS(app)

user_view = UserAPI.as_view('user_api')
device_view = deviceAPI.as_view('device_api')

app.add_url_rule('/users', view_func=user_view, methods=['GET',])
app.add_url_rule('/users', view_func=user_view, methods=['POST',])

app.add_url_rule('/devices', view_func=device_view, methods=['GET',])

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)