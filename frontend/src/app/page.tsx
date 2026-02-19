"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col items-center justify-center px-6 text-center">
      
      {/* Hero Section */}
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Organize Your Work.
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            {" "}Boost Productivity.
          </span>
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          A modern task management app built with Next.js and secure JWT authentication.
          Stay focused, track progress, and manage tasks effortlessly.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-8 py-3 rounded-xl border border-blue-600 text-blue-600 font-medium bg-white hover:bg-blue-50 hover:scale-105 transition-all duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        
        <div className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="text-blue-600 text-3xl mb-4">🔐</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Secure Authentication
          </h3>
          <p className="text-gray-600 text-sm">
            Access & Refresh tokens ensure secure login and protected routes
            for safe task management.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="text-indigo-600 text-3xl mb-4">🔎</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Smart Filtering
          </h3>
          <p className="text-gray-600 text-sm">
            Search, filter, and paginate tasks efficiently to keep your workflow organized.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div className="text-purple-600 text-3xl mb-4">📱</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Fully Responsive
          </h3>
          <p className="text-gray-600 text-sm">
            Beautifully designed interface that works perfectly on desktop,
            tablet, and mobile devices.
          </p>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} TaskTracker. Built with Next.js & TypeScript.
      </div>

    </div>
  );
}
