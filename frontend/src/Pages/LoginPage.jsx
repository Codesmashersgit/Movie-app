import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://movie-app-36y4.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Save token and user in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      // ✅ Redirect based on role
      if (data.user.role === "admin") {
        navigate("/admincontroller");
      } else {
        navigate("/"); // Normal user
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <AuthLayout subtitle="Login to your account">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-red-500" />
            Remember me
          </label>
          <span className="hover:text-red-500 cursor-pointer">Forgot password?</span>
        </div>

        <button className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition">
          Login
        </button>

        <p className="text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link to="/register">
            <span className="text-red-500 hover:underline cursor-pointer">Register</span>
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
