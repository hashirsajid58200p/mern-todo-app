import React from "react";
import { Link } from "react-router-dom";
const todoImg = "/images/todo.png";

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 py-6 md:py-12">
        <div className="flex flex-col justify-center text-center md:text-left">
          <span className="text-xs font-medium tracking-widest text-zinc-500 uppercase mb-4">
            Task Management
          </span>
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
            Manage tasks <br /> effortlessly.
          </h1>
          <p className="text-base text-zinc-400 leading-relaxed mt-4 max-w-md mx-auto md:mx-0">
            A beautiful and intuitive task manager designed to help you organize, prioritize, and track your daily to-dos with complete ease and focus.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              className="inline-flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-6 h-10 font-medium text-sm transition-colors w-full sm:w-auto"
              to="/register"
            >
              Register Now
            </Link>
            <Link
              className="inline-flex items-center justify-center border border-[#1f1f1f] hover:bg-[#111111] text-white rounded-lg px-6 h-10 font-medium text-sm transition-colors w-full sm:w-auto"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="bg-violet-600/5 rounded-2xl p-6 flex justify-center items-center">
          <img
            className="object-contain max-h-[300px] sm:max-h-[500px] w-full"
            src={todoImg}
            alt="heroImg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
