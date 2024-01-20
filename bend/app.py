from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "hello"

@app.route("/test", methods=['POST', 'GET'])
def test():
    response_body = {
        "Alex" : "shredded",
        "Lie" : "false"
    }
    return  response_body

@app.route("/cock", methods=['POST', 'GET'])
def cock():
    data = request.get_json()
    return data

@app.route("/save_review", methods=['POST'])
def save_review():
    with open("test.txt", "a") as f:
        f.write("Test Data\n")
    return {}

@app.route("/read_review")
def read_review():
    with open("test.txt", "r") as f:
        f.read()
    return {}

if __name__ == "__main__":
    app.run(debug=True)