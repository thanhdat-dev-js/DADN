from flask import Flask, request, jsonify
# from models import todo  # call model file
from flask_cors import CORS  # to avoid cors error in different frontend like react js or any other
from views.user import UserAPI

app = Flask(__name__)
CORS(app)

user_view = UserAPI.as_view('user_api')

app.add_url_rule('/users', view_func=user_view, methods=['GET',])
app.add_url_rule('/users', view_func=user_view, methods=['POST',])


if __name__ == '__main__':
    app.run(debug=True)