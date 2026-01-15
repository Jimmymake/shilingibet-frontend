import { Link } from "react-router-dom";

export default function AuthToggle() {
  return (
    <div className="flex gap-2 justify-center items-center">
      {/* Login Button */}
      <Link to="/login">
        <button className="px-6 py-1 bg-secondary border-4 border-black text-[rgb(151,137,205)]/90 font-semibold rounded-lg transition">
          Login
        </button>
      </Link>
      {/* Register Button */}
      <Link to="/register">
        <button className="px-6 py-1 bg-primary text-black font-bold rounded-md hover:scale-105 transition">
          Register
        </button>
      </Link>
    </div>
  );
}
