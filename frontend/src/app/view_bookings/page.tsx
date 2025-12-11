"use client";
import { useEffect, useState } from "react";
import { getBookings } from "@/lib/api/api";

interface Booking {
  timeslot: string;
}

export default function ViewBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchBookings = async () => {
      const data = await getBookings();
      if (Array.isArray(data)) {
        setBookings(data);
      } else if (data.error) {
        setMessage(data.error);
      }
    };

    fetchBookings();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>All Bookings (Admin)</h2>
      {message && <p>{message}</p>}
      <ul>
        {bookings.map((b, index) => (
          <li key={index}>{b.timeslot}</li>
        ))}
      </ul>
      <button style={{ marginTop: 20 }} onClick={logout}>
        Logout
      </button>
    </div>
  );
}
