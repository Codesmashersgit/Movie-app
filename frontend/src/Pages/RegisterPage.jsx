import AuthLayout from "../components/AuthLayout";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <AuthLayout subtitle="Create your account">
      <form className="space-y-5">

        <div>
          <label className="text-sm text-gray-300">Full Name</label>
          <input
            type="text"
            required
            placeholder="Sudhanshu Raj"
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            required
            className="w-full mt-1 px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
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
          <Link to="/login"><span className="text-red-500 hover:underline cursor-pointer">
            Login
          </span>
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
};

export default Register;
