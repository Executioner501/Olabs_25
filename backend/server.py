from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection (Use environment variables for security)
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://NIKHIL:chandu@olabs.qogd0.mongodb.net/OLABS?retryWrites=true&w=majority")
app.config["MONGO_URI"] = MONGO_URI

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
reports_collection = mongo.db.reports

# Root Endpoint - Health Check
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Server is running!"}), 200

# User Registration
@app.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.json
        username = data.get("username")
        fullname = data.get("fullname")
        user_type = data.get("user_type")
        subject = data.get("subject", None)  # Only for teachers
        password = data.get("password")

        if not username or not password or not fullname or not user_type:
            return jsonify({"message": "Missing required fields"}), 400

        # Check if user already exists
        if mongo.db.users.find_one({"username": username}):
            return jsonify({"message": "User already exists"}), 409

        # Hash password
        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        # Prepare user data
        user_data = {
            "username": username,
            "fullname": fullname,
            "user_type": user_type,
            "subject": subject if user_type == "teacher" else None,
            "password": hashed_password,
        }

        # Insert into database
        mongo.db.users.insert_one(user_data)
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route("/add_report", methods=["POST"])
def add_report():
    try:
        data = request.json
        username = data.get("username")  # Frontend sends the username from local storage
        title = data.get("title")  # Question title
        totalMarks = data.get("totalMarks")  
        topic_wise_correct = data.get("topicMarks")  
        

        if not username or not title or totalMarks is None or not isinstance(topic_wise_correct, dict):
            return jsonify({"message": "Missing required fields"}), 400

        # Check if user exists
        user = mongo.db.users.find_one({"username": username})
        if not user:
            return jsonify({"message": "User not found"}), 404

        # Create report document
        report_data = {
            "username": username,
            "title": title,
            "total_score": totalMarks,
            "topic_wise_correct": topic_wise_correct,
            
        }

        # Insert into database
        reports_collection.insert_one(report_data)
        return jsonify({"message": "Report added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500
# User Login
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"message": "Username and password required"}), 400

        # Find user in database
        user = mongo.db.users.find_one({"username": username})

        if user and bcrypt.check_password_hash(user["password"], password):
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/add_user")
def add_user():
    user_data = {
        "username": "john_doe",
        "fullname": "John Doe",
        "role": "student",
        "password": "hashed_password_here"
    }
    users_collection.insert_one(user_data)
    return "User added successfully!"
users_collection = mongo.db.users  # Define users collection

if __name__ == "__main__":
    app.run(debug=True)
