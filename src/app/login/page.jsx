"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
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
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2">
      <div className="flex flex-col items-center space-y-4">
        <img src="/login.svg" alt="Welcome" className="w-24 mb-6" />

        <form
          className="w-72 bg-white rounded-lg shadow-md p-4 space-y-3"
          onSubmit={handleLogin}
        >
          <h2 className="text-xl font-bold text-gray-800 text-center">Login</h2>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
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
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-800 transition text-sm"
          >
            Login
          </button>

          {message && <p className="text-center text-red-500 text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
}
