"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-purple-700 to-black">

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl p-10 rounded-2xl w-[380px] text-white">

        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 focus:border-blue-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 focus:border-blue-400 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition transform"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm mt-6 text-gray-300">
          Don't have an account?{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => router.push("/signup")}
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
}