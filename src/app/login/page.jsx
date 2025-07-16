"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase }  from "../../../lib/supabaseClient";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState(""); // we're using email, not username
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful!");
      router.push("/dashboard"); // redirect after successful login
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <img src="/login.svg" alt="Welcome" className="w-64 mb-6" />

      <form
        className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        {message && <p className="text-center text-red-500 text-sm">{message}</p>}
      </form>
    </div>
  );
}
