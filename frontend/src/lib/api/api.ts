export const API_BASE = "http://127.0.0.1:5000";

export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
};

export const createBooking = async (timeslot: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify({ timeslot }),
  });

  return response.json();
};

export async function getBookings() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/bookings`, {
    headers: { Authorization: token || "" },
  });
  return res.json();
}
