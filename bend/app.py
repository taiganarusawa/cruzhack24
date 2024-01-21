from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas
import time
import os
from sql import *

app = Flask(__name__)

# Image Upload/Access
UPLOAD_FOLDER = './uploaded-media'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_PATH'] = 8e9

CORS(app)

# reviews stored in csv
review_data = pandas.read_csv("fudge.csv")

# check
@app.route("/test")
def hello_world():
    return {'time' : time.time()}

# store current page to pull up correct reviews
current_page = 0

# sanity check, 

@app.route("/read-review")
def read_review():
    ten_entries = review_data[0][0:10]
    return {'data' : ten_entries.to_json()}

@app.route("/submit-review")
def submit_review():
    return {}


### Image upload/access

# validation
def allowed_file(fname):
    return '.' in fname and fname.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=['GET', 'POST'])
def uploader():
    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'status' : 'file not found'})
        files = request.files.getlist('file')
        for f in files:
            fn = f.filename
            if allowed_file(fn):
                f.save(os.path.join(UPLOAD_FOLDER, fn))
            else:
                return jsonify({'message' : 'File type not allowed'}), 400
            return jsonify({'name' : f.filename, 'status' : 'success'})
    else:
        return jsonify({'status' : 'failed'})

# figure out way to id images
img_name = '5mz4p6.jpg'

@app.route("/image-get")
def image_get():
    return jsonify({'flink' : './uploaded-media/' + img_name})

if __name__ == "__main__":
    app.run(debug=True)