"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [timeslot, setTimeslot] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
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
    router.push("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Book a Timeslot</h2>
      <form onSubmit={handleBooking}>
        <select
          value={timeslot}
          onChange={(e) => setTimeslot(e.target.value)}
          required
        >
          <option value="">-- Select Timeslot --</option>
          {TIMESLOTS.map((slot) => (
            <option key={slot}>{slot}</option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit">Book Now</button>
      </form>
      <p>{message}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
