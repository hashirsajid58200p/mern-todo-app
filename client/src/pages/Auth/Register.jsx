import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/AuthService";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = { email, password, username };
      const res = await AuthServices.registerUser(data);
      toast.success(res.data.message);
      navigate("/login");
      console.log(res.data);
    } catch (err) {
      const errMsg = getErrorMessage(err);
      setError(errMsg);
      toast.error(errMsg);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-sm mx-auto mt-12 sm:mt-24 px-4">
      <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <span className="text-white font-semibold text-lg">Register</span>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-900/60 text-red-200 text-sm rounded-lg flex items-start gap-2">
            <svg className="h-5 w-5 text-red-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={registerHandler}>
          <div className="mb-4">
            <label className="block text-sm text-zinc-400 mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-600"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-zinc-400 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-600"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm text-zinc-400 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-600"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg h-10 font-medium text-sm transition-colors mb-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Registering...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <div className="text-center text-zinc-400 text-sm">
          Already a user? Please{" "}
          <Link className="text-violet-400 hover:underline" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
