from flask import Flask, request, jsonify, url_for, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
import pandas
import time
import os
from sql import *
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Image Upload/Access
UPLOAD_FOLDER = "./uploaded-media"
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_PATH"] = 8e9
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "sqlite:///reviews.db"  # Use your actual database URI
app.config["UPLOAD_FOLDER"] = "./imageUploads"
app.config["ALLOWED_EXTENSIONS"] = {"txt", "pdf", "png", "jpg", "jpeg", "gif"}
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app, resources={r"/api/*": {"origins": "*"}})
db = SQLAlchemy(app)

# reviews stored in csv
# review_data = pandas.read_csv("fudge.csv")


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    selected_college = db.Column(db.String(100))
    user_name = db.Column(db.String(100))
    college_rating = db.Column(db.Integer)
    condition = db.Column(db.String(50))
    brief_review = db.Column(db.Text)
    total_people_in_room = db.Column(db.Integer)
    file_paths = db.Column(
        db.String(255)
    )  # Store multiple file paths as a comma-separated string


# sanity check,

### Image upload/access


# validation
def allowed_file(fname):
    return "." in fname and fname.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def create_review(
    files,
    selected_college,
    user_name,
    college_rating,
    condition,
    brief_review,
    total_people_in_room,
):
    file_paths = []

    for file in files:
        print(file)
        if file:
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(file_path)
            file_paths.append(file_path)

    review = Review(
        selected_college=selected_college,
        user_name=user_name,
        college_rating=college_rating,
        condition=condition,
        brief_review=brief_review,
        total_people_in_room=total_people_in_room,
        file_paths=",".join(
            file_paths
        ),  # Store multiple file paths as a comma-separated string
    )

    db.session.add(review)
    db.session.commit()
    return 200


@app.route("/api/getreviews", methods=["GET"])
def get_reviews():
    print("Got request")
    college_name = request.args.get("collegeName")
    page = request.args.get("page", type=int, default=1)

    # Calculate the offset based on the page number
    offset = (page - 1) * 10

    # Query the database for reviews, sorted by collegeName and limited to 10 records
    reviews = (
        Review.query.filter_by(selected_college=college_name)
        .order_by(desc(Review.selected_college))
        .offset(offset)
        .limit(10)
        .all()
    )

    print("Got reviews")

    # Create a list to store the results
    results = []

    # Process each review and construct the response
    for review in reviews:
        result = {
            "id": review.id,
            "selected_college": review.selected_college,
            "user_name": review.user_name,
            "college_rating": review.college_rating,
            "condition": review.condition,
            "brief_review": review.brief_review,
            "total_people_in_room": review.total_people_in_room,
            "file_paths": [
                url_for("imageupload", filename=filename)
                for filename in review.file_paths.split(",")
            ],
        }
        results.append(result)

    print("results:", results)

    return jsonify(results)


@app.route("/api/createreview", methods=["POST", "GET"])
def imageupload():
    if request.method == "POST":
        form_data = request.form
        # Verify/sanitize input
        files = request.files.getlist("files")
        selected_college = form_data.get("selectedCollege")
        user_name = form_data.get("userName")
        college_rating = form_data.get("collegeRating")
        condition = form_data.get("condition")
        brief_review = form_data.get("briefReview")
        total_people_in_room = form_data.get("totalPeopleInRoom")
        if (
            files
            and selected_college
            and user_name
            and college_rating
            and condition
            and brief_review
            and total_people_in_room != 0
        ):
            res = create_review(
                files,
                selected_college,
                user_name,
                college_rating,
                condition,
                brief_review,
                total_people_in_room,
            )
            if res == 200:
                return jsonify(
                    {"name": "review_upload", "status": "success"},
                )
            else:
                return jsonify({"name": "review_upload", "status": "failed"})
        else:
            print(
                files,
                selected_college,
                user_name,
                college_rating,
                brief_review,
                condition,
                total_people_in_room,
            )
    else:
        # Returns the image that is hosted
        print(request.args.get("filename"))
        return send_file(request.args.get("filename"))


with app.app_context():
    db.create_all()


@app.after_request
def add_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")

    return response


if __name__ == "__main__":
    # Create the database tables if they don't exist
    app.run(debug=True)
