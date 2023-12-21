from flask import Flask
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def quiz():
    with open("data.json") as f:
        data = json.load(f)

        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
        return response