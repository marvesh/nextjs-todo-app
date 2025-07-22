"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: "http://localhost:3000/login",
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Registration successful! Check your email to verify. You'll be redirected to login after verification."
      );
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/to-do.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Form Card */}
      <div className="relative z-10 bg-gray-100 shadow-lg rounded-lg p-8 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Sign up!
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type your password"
              className="w-full px-4 py-2 bg-white text-gray-800 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300"
          >
            Register
          </button>

          {message && (
            <p className="text-sm text-center mt-2 text-red-500">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
