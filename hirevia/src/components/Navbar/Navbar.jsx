"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        setUserName(name);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUserName(userCredential.user.displayName || email.split("@")[0]);
      }

      setIsLoggedIn(true);
      setShowAuthForm(false);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      alert(error.message);
      console.error("Firebase Auth Error:", error);
    }
  };

  const openAuthForm = (signup) => {
    setIsSignup(signup);
    setShowAuthForm(true);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUserName("");
      setMenuOpen(false);
      setShowDropdown(false);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* NAVBAR COMPONENT */}
      <nav className="flex items-center justify-between px-6 py-3 bg-black/30 text-white shadow-md sticky top-0 z-40">
        <div className="text-2xl font-bold tracking-wide">
          Hire<span className="text-[#8B5CF6]">Via</span>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <FaTimes className="text-2xl text-[#8B5CF6]" />
            ) : (
              <FaBars className="text-2xl text-[#8B5CF6]" />
            )}
          </button>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className="hover:text-[#7C3AED] transition">Home</Link>
          <Link href="/jobs" className="hover:text-[#7C3AED] transition">Search Jobs</Link>
          <Link href="/tracker" className="hover:text-[#7C3AED] transition">ApplicationTracker</Link>
          <Link href="/blog" className="hover:text-[#7C3AED] transition">Career Blog</Link>
        </div>
        <div className="hidden md:flex items-center gap-4 relative">
          {isLoggedIn ? (
            <div ref={dropdownRef} className="relative">
              <button onClick={toggleDropdown} className="flex items-center gap-2 text-sm">
                <FaUserCircle className="text-2xl" />
                <span className="hidden sm:inline font-medium">{userName}</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white text-black w-48 rounded-md shadow-md py-2 text-sm">
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-red-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthForm(false)}
              className="px-5 py-1.5 bg-[#8B5CF6] text-white text-sm font-medium rounded hover:bg-[#7C3AED] transition"
            >
              Login / SignUp
            </button>
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 py-6 bg-[#8B5CF6] text-[#FFFFFF] text-sm font-medium shadow-md">
          <Link href="/" className="hover:text-white" onClick={toggleMenu}>Home</Link>
          <Link href="/jobs" className="hover:text-white" onClick={toggleMenu}>Find Jobs</Link>
          <Link href="/tracker" className="hover:text-white" onClick={toggleMenu}>Tracker</Link>
          <Link href="/blog" className="hover:text-white" onClick={toggleMenu}>Blog</Link>
          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-2">
              <span>{userName}</span>
              <button onClick={handleLogout} className="px-4 py-2 bg-white text-white font-bold rounded hover:bg-white text-sm">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthForm(false)}
              className="px-5 py-1.5 bg-[#8B5CF6] text-black font-semibold rounded hover:bg-[#7C3AED] text-sm"
            >
              Login
            </button>
          )}
        </div>
      )}

      {/* AUTH FORM MODAL */}
      {showAuthForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-md rounded-2xl p-8 space-y-6 shadow-2xl animate-fade-in
            backdrop-blur-xl bg-gradient-to-br from-[#2d2d2d]/60 via-[#444]/50 to-[#000000]/70 
            border border-white/20 text-white transition-all duration-300"
          >
            <div className="text-center text-2xl font-bold flex justify-center items-center gap-2">
              {isSignup ? "Create Your HireVia Account" : "Welcome Back to HireVia"}
            </div>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isSignup && (
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-white/100 text-black focus:outline-none focus:ring-3 focus:ring-[#8B5CF6]"
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white/100 text-black focus:outline-none focus:ring-3 focus:ring-[#8B5CF6]"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-white/100 text-black focus:outline-none focus:ring-3 focus:ring-[#8B5CF6]"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#8B5CF6] text-white font-bold rounded hover:bg-[#7C3AED] transition"
              >
                {isSignup ? "Sign Up" : "Log In"}
              </button>
            </form>
            <div className="flex justify-between items-center text-sm mt-4">
              <button onClick={() => setShowAuthForm(false)} className="hover:underline text-gray-300">
                Cancel
              </button>
              <button onClick={() => openAuthForm(!isSignup)} className="text-[#8B5CF6] hover:underline font-semibold">
                {isSignup ? "Already have an account?" : "Create an account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
