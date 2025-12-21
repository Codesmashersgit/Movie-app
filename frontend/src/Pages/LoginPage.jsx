import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <AuthLayout subtitle="Login to your account">
      <form className="space-y-5">

        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
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
          <span className="hover:text-red-500 cursor-pointer">
            Forgot password?
          </span>
        </div>

        <button className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition">
          Login
        </button>

        <p className="text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
         <Link to="/register"><span className="text-red-500 hover:underline cursor-pointer">
            Register
          </span>
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
};

export default Login;
