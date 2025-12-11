users = {
    "admin": {"username": "admin", "password": "admin123", "is_admin": True},
    "user1": {"username": "user1", "password": "pass123", "is_admin": False}
}

TIME_SLOTS = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00"
]

bookings = []  # each booking = {"timeslot": "10:00 - 11:00"}
session_tokens = {}  # token -> username