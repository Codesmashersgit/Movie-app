

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://movieappwe.netlify.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Account created successfully!");
      navigate("/"); // Redirect to login page
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <AuthLayout subtitle="Create your account">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-gray-300">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Sudhanshu Raj"
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        <button className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition">
          Create Account
        </button>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-red-500 hover:underline cursor-pointer">Login</span>
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
