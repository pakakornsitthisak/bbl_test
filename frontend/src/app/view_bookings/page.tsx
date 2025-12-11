"use client";
import { useEffect, useState } from "react";
import { getBookings } from "@/lib/api/api";

interface Booking {
  timeslot: string;
  user_id: string;
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
    <div className="w-100 bg-gray-200 border-black p-4 m-2 rounded-md border-2 items-center justify-center text-center">
      <div className="p-4 flex flex-col">
        <div className="p-4">
          <h2 className="font-bold text-2xl">All Bookings (Admin)</h2>
        </div>
        {message && <p>{message}</p>}
        {bookings.length > 0 && (
          <div className="pt-4 bg-yellow-100 border-yellow-900 border-2 rounded-md p-4 text-md">
            <ul>
              {bookings.map((b, index) => (
                <li key={index}>
                  {b.user_id} - {b.timeslot}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="p-2 mt-4 bg-blue-500 border-blue-900 border-2 text-white font-bold rounded-md"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
