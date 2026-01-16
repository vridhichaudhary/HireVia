"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaBell, FaBriefcase, FaRobot } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { usePathname } from "next/navigation";

const AuthForm = ({ isSignup, closeModal }) => {
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignup) await register(formData.name, formData.email, formData.password);
      else await login(formData.email, formData.password);
      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-center mb-6">
        {isSignup ? "Create your account" : "Welcome back"}
      </h3>

      <button
        type="button"
        onClick={() => window.location.href = "http://localhost:8080/api/auth/google"}
        className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition-all hover:shadow-md"
      >
        <div className="text-xl">
          <FcGoogle />
        </div>
        Continue with Google
      </button>

      <div className="relative flex items-center gap-4 my-6 opacity-60">
        <div className="h-[1px] bg-slate-200 flex-1"></div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Or continue with email</span>
        <div className="h-[1px] bg-slate-200 flex-1"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-xs text-center font-bold bg-red-50 p-2 rounded">{error}</div>}
        {isSignup && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
            <input
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-300 transition-all font-medium placeholder:text-slate-400"
              placeholder="John Doe"
              required
            />
          </div>
        )}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-300 transition-all font-medium placeholder:text-slate-400"
            placeholder="name@company.com"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-slate-300 transition-all font-medium placeholder:text-slate-400"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-[0.98]"
        >
          {isSignup ? "Create Account" : "Sign In"}
        </button>
      </form>
    </div>
  );
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Authentic Navigation Links
  const navLinks = [
    { name: "Home", href: "/", icon: null },
    { name: "Find Jobs", href: "/jobs", icon: <FaBriefcase className="mr-2" /> },
    { name: "Tracker", href: "/tracker", icon: null },
    { name: "AI Hub", href: "/ai", icon: <FaRobot className="mr-2" /> },
  ];

  const isHome = pathName === "/";
  const transparentHeader = isHome && !isScrolled;
  const isActive = (path) => pathName === path;

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100" : transparentHeader ? "bg-transparent border-b border-white/5" : "bg-white border-b border-slate-100"} h-20 flex items-center px-6 md:px-10`}>
        <div className="flex items-center justify-between w-full max-w-[1600px] mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg transition-colors ${transparentHeader ? "bg-white text-slate-900" : "bg-black text-white"}`}>
              <span>h</span>
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors ${transparentHeader ? "text-white" : "text-slate-900"}`}>hirevia</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center text-sm font-medium transition-all relative h-20 ${isActive(link.href)
                  ? transparentHeader ? "text-white font-bold border-b-2 border-white" : "text-slate-900 font-bold border-b-2 border-black"
                  : transparentHeader ? "text-slate-300 hover:text-white" : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth / Profile Section */}
          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => { setIsSignup(false); setShowAuthModal(true); }}
                  className={`font-bold text-sm transition-colors ${transparentHeader ? "text-white hover:text-blue-100" : "text-slate-600 hover:text-black"}`}
                >
                  Log In
                </button>
                <button
                  onClick={() => { setIsSignup(true); setShowAuthModal(true); }}
                  className={`px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg transition-all ${transparentHeader ? "bg-white text-slate-900 hover:bg-slate-100" : "bg-black text-white hover:bg-slate-800"}`}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">

                <div className="h-8 w-[1px] bg-slate-200"></div>

                <div className="flex items-center gap-3">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-bold text-slate-900 leading-tight">{user.name}</p>
                    <p className="text-xs text-slate-500 font-medium">Job Seeker</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    title="Logout"
                  >
                    <span className="font-bold text-xs">LO</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-50 text-slate-900 p-2"
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={toggleMenu}
                  className="text-lg font-bold text-slate-900"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-slate-100">
                {!user ? (
                  <button
                    onClick={() => { toggleMenu(); setShowAuthModal(true); }}
                    className="w-full bg-black text-white py-3 rounded-lg font-bold"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={() => { logout(); toggleMenu(); }}
                    className="w-full bg-slate-100 text-slate-900 py-3 rounded-lg font-bold"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <HiX size={20} />
              </button>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {isSignup ? "Create Account" : "Access Dashboard"}
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                Enter your details to access the hiring ecosystem.
              </p>

              <AuthForm isSignup={isSignup} closeModal={() => setShowAuthModal(false)} />

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-sm text-slate-500 font-medium hover:text-black transition-colors"
                >
                  {isSignup ? "Already have an account? Login" : "New to HireVia? Create Account"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
