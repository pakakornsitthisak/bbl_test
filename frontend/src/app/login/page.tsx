"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api/api";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await loginUser(username, password);
    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/booking");
    } else {
      setMessage(data.error || "Login failed");
    }
  };

  return (
    <div className="m-2 bg-gray-200 rounded-md border-2 border-black w-100 p-4 items-center justify-center text-center">
      <h2 className="font-bold text-2xl">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="mt-4 w-full bg-blue-100 border-blue-900 border-2 rounded-md p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          className="w-full bg-blue-100 border-blue-900 border-2 rounded-md p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button
          className="p-2 w-full bg-blue-500 border-blue-900 border-2 text-white font-bold rounded-md"
          type="submit"
        >
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
