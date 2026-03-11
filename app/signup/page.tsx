"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = async (e:any) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if(error){
      alert(error.message);
    }else{
      alert("Signup successful!");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black relative overflow-hidden">

      {/* Floating glow circles */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 bottom-0 right-0 animate-pulse"></div>

      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-[380px] text-white z-10">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-300 mb-6 text-sm">
          Join SnippetVault and save your code snippets
        </p>

        <form onSubmit={handleSignup} className="space-y-4">

          <input
            type="text"
            placeholder="Display Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 focus:border-purple-400 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 focus:border-purple-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 focus:border-purple-400 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition transform shadow-lg"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center text-sm mt-6 text-gray-300">
          Already have an account?{" "}
          <span
            onClick={()=>router.push("/login")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}