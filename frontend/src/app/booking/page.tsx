"use client";
import { useState, useEffect } from "react";
import { createBooking } from "@/lib/api/api";

const TIMESLOTS = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

export default function Booking() {
  const [timeslot, setTimeslot] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await createBooking(timeslot);
    if (data.message) setMessage("Booking successful!");
    else setMessage(data.error || "Error creating booking");
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleViewBooking = () => {
    window.location.href = "/view_bookings";
  };

  return (
    <div className="w-100 bg-gray-200 border-2 border-black p-4 m-2">
      <h2 className="font-bold text-2xl">Book a Timeslot</h2>
      <form onSubmit={handleBooking}>
        <select
          className="mt-2 bg-blue-200 border-blue-900 rounded-md border-2 p-4 w-full h-10"
          value={timeslot}
          onChange={(e) => setTimeslot(e.target.value)}
          required
        >
          <option value="">-- Select Timeslot --</option>
          {TIMESLOTS.map((slot) => (
            <option key={slot}>{slot}</option>
          ))}
        </select>
        <button
          className="mt-4 p-2 w-full bg-blue-600 border-2 border-blue-900 text-white font-bold rounded-md"
          type="submit"
        >
          Book Now
        </button>
      </form>
      <p>{message}</p>
      <button
        className="mt-4 p-2 w-full bg-green-400 border-2 border-green-700 text-white font-bold rounded-md"
        onClick={handleViewBooking}
      >
        View bookings
      </button>
      <button
        className="mt-4 p-2 w-full bg-gray-400 border-2 border-gray-700 text-white font-bold rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
