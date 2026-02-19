"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          TaskTracker
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4">
          {isAuthenticated && (
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block"
            >
              Dashboard
            </Link>
          )}

          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="text-left text-red-500"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
