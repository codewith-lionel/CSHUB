import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaChevronDown,
  FaUserShield,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        !e.target.closest(".mobile-menu") &&
        !e.target.closest(".hamburger")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/faculty", label: "Faculty" },
    { path: "/academics", label: "Courses" },
    {
      label: "Resources",
      dropdown: [
        { path: "/study-materials", label: "Study Materials" },
        { path: "/events", label: "Events" },
      ],
    },
    { path: "/gallery", label: "Gallery" },
    { path: "/achievements", label: "Achievements" },
  ];

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl py-2"
            : "bg-white/90 backdrop-blur-lg shadow-lg py-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo with Animation */}
            <Link to="/" className="flex items-center gap-3 group relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary-400 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

              {/* Icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 w-12 h-12 rounded-full flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-2xl">
                  <FaGraduationCap className="text-2xl text-white" />
                </div>
              </div>

              {/* Text */}
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                  CS Department
                </h1>
                <p className="text-xs text-gray-600 group-hover:text-primary-500 transition-colors">
                  Excellence in Education
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link, index) =>
                link.dropdown ? (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        activeDropdown === link.label
                          ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-600"
                      }`}
                    >
                      {link.label}
                      <FaChevronDown
                        className={`text-xs transition-transform duration-300 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu with Animation */}
                    <div
                      className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 border border-gray-100 ${
                        activeDropdown === link.label
                          ? "opacity-100 translate-y-0 visible"
                          : "opacity-0 -translate-y-2 invisible"
                      }`}
                    >
                      {link.dropdown.map((item, i) => (
                        <Link
                          key={i}
                          to={item.path}
                          className={`block px-6 py-3.5 font-semibold transition-all duration-300 transform hover:translate-x-2 ${
                            isActive(item.path)
                              ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white"
                              : "text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-600"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                isActive(item.path)
                                  ? "bg-white"
                                  : "bg-primary-400"
                              }`}
                            ></span>
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={link.path}
                    className={`relative px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden group ${
                      isActive(link.path)
                        ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
                        : "text-gray-700 hover:text-primary-600"
                    }`}
                  >
                    {/* Hover Background Animation */}
                    <span
                      className={`absolute inset-0 bg-gradient-to-r from-primary-50 to-primary-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                        isActive(link.path) ? "hidden" : ""
                      }`}
                    ></span>
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                )
              )}

              {/* Admin Button with Gradient */}
              <Link
                to="/admin/login"
                className="relative ml-2 flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden group"
              >
                {/* Animated Background */}
                <span className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>

                <FaUserShield className="text-lg relative z-10 group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Admin</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden hamburger p-2.5 rounded-xl hover:bg-primary-50 transition-all duration-300 transform hover:scale-110"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="text-2xl text-primary-600 animate-spin-once" />
              ) : (
                <FaBars className="text-2xl text-gray-900 hover:text-primary-600 transition-colors" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu with Slide Animation */}
        <div
          className={`lg:hidden mobile-menu transition-all duration-500 ease-in-out ${
            isOpen
              ? "max-h-screen opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4 overflow-hidden"
          }`}
        >
          <div className="container mx-auto px-4 py-6 bg-white/95 backdrop-blur-xl border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) =>
                link.dropdown ? (
                  <div
                    key={index}
                    className="animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                        activeDropdown === link.label
                          ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-600"
                      }`}
                    >
                      <span>{link.label}</span>
                      <FaChevronDown
                        className={`text-sm transition-transform duration-300 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mobile Dropdown */}
                    <div
                      className={`ml-4 mt-2 space-y-2 overflow-hidden transition-all duration-300 ${
                        activeDropdown === link.label
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {link.dropdown.map((item, i) => (
                        <Link
                          key={i}
                          to={item.path}
                          className={`block px-5 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:translate-x-2 ${
                            isActive(item.path)
                              ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
                              : "text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-600"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={link.path}
                    className={`flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 transform hover:translate-x-2 animate-slide-in ${
                      isActive(link.path)
                        ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-primary-100 hover:text-primary-600"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        isActive(link.path) ? "bg-white" : "bg-primary-400"
                      }`}
                    ></span>
                    {link.label}
                  </Link>
                )
              )}

              {/* Mobile Admin Button */}
              <Link
                to="/admin/login"
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg mt-4 animate-slide-in"
                style={{ animationDelay: `${navLinks.length * 0.1}s` }}
              >
                <FaUserShield className="text-lg" />
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16"></div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes spin-once {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(180deg);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-spin-once {
          animation: spin-once 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
