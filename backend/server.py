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
users_collection = mongo.db.users  # Define users collection

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
        subject = data.get("subject", None)
        password = data.get("password")

        if not username or not password or not fullname or not user_type:
            return jsonify({"message": "Missing required fields"}), 400

        if mongo.db.users.find_one({"username": username}):
            return jsonify({"message": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        user_data = {
            "username": username,
            "fullname": fullname,
            "user_type": user_type,
            "subject": subject if user_type == "teacher" else None,
            "password": hashed_password,
        }

        mongo.db.users.insert_one(user_data)
        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add Report
@app.route("/add_report", methods=["POST"])
def add_report():
    try:
        data = request.json
        username = data.get("username")
        title = data.get("title")
        totalMarks = data.get("totalMarks")
        weakAreas = data.get("weakAreas")

        if not username or not title or totalMarks is None or weakAreas is None:
            return jsonify({"message": "Missing required fields"}), 400

        user = mongo.db.users.find_one({"username": username})
        if not user:
            return jsonify({"message": "User not found"}), 404

        report_data = {
            "username": username,
            "title": title,
            "total_score": totalMarks,  # Store as is, may be in "X / Y" format
            "weakAreas": weakAreas,
        }

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

        user = mongo.db.users.find_one({"username": username})

        if user and bcrypt.check_password_hash(user["password"], password):
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get Student and All Reports
@app.route("/get-student", methods=["GET"])
def get_student():
    username = request.args.get("username")

    user = users_collection.find_one({"username": username})
    if not user:
        return jsonify({"error": "Student not found"}), 404

    student_reports = list(reports_collection.find({"username": username}))

    # Calculate total obtained and max scores
    total_obtained = 0
    total_max = 0
    
    for report in student_reports:
        score = report.get("total_score", "0 / 0")
        if isinstance(score, str) and "/" in score:
            parts = score.split("/")
            try:
                obtained = int(parts[0].strip())
                max_score = int(parts[1].strip())
                total_obtained += obtained
                total_max += max_score
            except (ValueError, IndexError):
                # Handle cases where the format is not as expected
                continue
        elif isinstance(score, int):
            total_obtained += score
    
    all_weak_areas = []
    for report in student_reports:
        weak_areas = report.get("weakAreas", "")
        if isinstance(weak_areas, str):
            # If it's a comma-separated string, split it
            all_weak_areas.extend([area.strip() for area in weak_areas.split(",")])
        elif isinstance(weak_areas, list):
            all_weak_areas.extend(weak_areas)

    response = {
        "username": username,
        "fullname": user.get("fullname", username),
        "total_obtained": total_obtained,
        "total_max": total_max,
        "total_score": f"{total_obtained} / {total_max}",
        "weakAreas": list(set(all_weak_areas)),  # Remove duplicates
        "reports": student_reports  # Include individual reports for reference
    }
    return jsonify(response), 200

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

if __name__ == "__main__":
    app.run(debug=True)
