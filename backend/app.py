from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps
import uuid

from db import TIME_SLOTS, bookings, session_tokens, users

app = Flask(__name__)
CORS(app)

def generate_token(username):
    token = str(uuid.uuid4())
    session_tokens[token] = username
    return token

def authenticate(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token or token not in session_tokens:
            return jsonify({"error": "Unauthorized"}), 401
        request.user = users[session_tokens[token]]
        return f(*args, **kwargs)
    return wrapper

def admin_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if not request.user.get("is_admin"):
            return jsonify({"error": "Admin access required"}), 403
        return f(*args, **kwargs)
    return wrapper

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    if username not in users or users[username]["password"] != password:
        return jsonify({"error": "Invalid credentials"}), 401
    token = generate_token(username)
    return jsonify({"token": token})

@app.route("/bookings", methods=["POST"])
@authenticate
def create_booking():
    data = request.json
    timeslot = data.get("timeslot")
    
    if timeslot not in TIME_SLOTS:
        return jsonify({"error": "Invalid timeslot"}), 400

    for booking in bookings:
        if booking["timeslot"] == timeslot:
            return jsonify({"error": "Timeslot already booked"}), 400

    booking = {
        "timeslot": timeslot,
        "user_id": request.user["username"]
    }
    bookings.append(booking)

    return jsonify({"message": "Booking created", "booking": booking})



@app.route("/bookings", methods=["GET"])
@authenticate
@admin_required
def get_bookings():
    return jsonify(bookings)


if __name__ == "__main__":
    app.run(debug=True)
