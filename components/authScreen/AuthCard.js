"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthToggle } from "./context/authContext";
import { motion } from "framer-motion";

export default function AuthCard() {
  // Active tab: "signin", "signup", or "forgot"
  const [activeTab, setActiveTab] = useState("signin");
  const [name, setName] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [registerType, setRegisterType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Field error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  
  // API response messages
  const [apiError, setApiError] = useState("");
  const [apiMessage, setApiMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { toggleAuthCard } = useContext(AuthToggle);
  const router = useRouter();

  // For Forgot Password (UI only)
  const [isResetSent, setIsResetSent] = useState(false);
  const [resetCountdown, setResetCountdown] = useState(60);

  // --- Validation functions ---
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
    return strength >= 3;
  };

  // --- Redirect after sign in/up (if needed) ---
  useEffect(() => {
    if (isRedirecting) {
      const timer = setTimeout(() => {
        // Uncomment below lines if you want to redirect after success:
        // router.push("/StudentDashboard");
        // toggleAuthCard();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isRedirecting, router]);

  // --- Countdown timer for Forgot Password ---
  useEffect(() => {
    let timer;
    if (activeTab === "forgot" && isResetSent && resetCountdown > 0) {
      timer = setInterval(() => {
        setResetCountdown((prev) => prev - 1);
      }, 1000);
    }
    if (resetCountdown === 0) {
      setIsResetSent(false);
      setResetCountdown(60);
    }
    return () => clearInterval(timer);
  }, [activeTab, isResetSent, resetCountdown]);

  // --- API call for user registration (Sign Up) ---
  const Register = async (details) => {
    console.log(details)
    try {
      // Reset API messages and start spinner
      setApiError("");
      setApiMessage("");
      setIsRedirecting(true);

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Include credentials so that cookies are correctly handled
        credentials: "include",
        body: JSON.stringify(details),
      });
      const data = await response.json();

      if (!response.ok) {
        setApiError(data.error || "Registration failed");
        setIsRedirecting(false);
      } else {
        setApiMessage(data.message || "Registration successful. Please log in.");
        // Clear signup fields and switch to signin mode
        setName("");
        setPhone("");
        setPassword("");
        setActiveTab("signin");
        setIsRedirecting(false);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setApiError("Registration failed due to network error.");
      setIsRedirecting(false);
    }
  };

  // --- API call for login (Sign In) ---
  const Login = async (details) => {
    try {
      // Reset API messages and start spinner
      setApiError("");
      setApiMessage("");
      setIsRedirecting(true);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Include credentials to allow cookies to be received/sent
        credentials: "include",
        body: JSON.stringify(details),
      });
      const data = await response.json();

      if (!response.ok) {
        setApiError(data.error || "Login failed");
        setIsRedirecting(false);
      } else {
        setApiMessage(data.message || "Login successful");
        // At this point, the accessToken and refreshToken have been set in HTTP-only cookies.
        // Optionally, you can redirect the user after a successful login:
        router.push("/StudentDashboard");
        setIsRedirecting(false);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setApiError("Login failed due to network error.");
      setIsRedirecting(false);
    }
  };

  // --- Handle form submission ---
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset error and API messages
    setEmailError("");
    setPasswordError("");
    setNameError("");
    setPhoneError("");
    setApiError("");
    setApiMessage("");

    if (activeTab === "signin") {
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address.");
        return;
      }
      // if (!validatePassword(password)) {
      //   setPasswordError("Password is not strong enough.");
      //   return;
      // }
      Login({ email, password });
    } else if (activeTab === "signup") {
      if (!name.trim()) {
        setNameError("Please enter your name.");
        return;
      }
      if (!phoneNumber.trim()) {
        setPhoneError("Please enter your phone number.");
        return;
      }
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address.");
        return;
      }
      // if (!validatePassword(password)) {
      //   setPasswordError("Password is not strong enough.");
      //   return;
      // }
      Register({ name, phoneNumber, email, password, registerType });
    } else if (activeTab === "forgot") {
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address.");
        return;
      }
      // Simulate sending reset link
      setApiMessage("Reset link sent to your email.");
      setIsResetSent(true);
    }
  };

  // --- Utility for password strength color ---
  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-400";
      case 4:
        return "bg-green-600";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={toggleAuthCard}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-96 relative mx-4"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAuthCard}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <i className="ri-close-line text-2xl" />
        </motion.button>

        {/* Render tabs only for Sign In and Sign Up */}
        {activeTab !== "forgot" && (
          <div className="flex justify-center space-x-8 mb-8">
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("signin")}
                className={`px-2 py-1 text-sm font-medium relative ${
                  activeTab === "signin"
                    ? "text-black dark:text-white"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                Sign In
                {activeTab === "signin" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            </div>
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab("signup")}
                className={`px-2 py-1 text-sm font-medium relative ${
                  activeTab === "signup"
                    ? "text-black dark:text-white"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                Sign Up
                {activeTab === "signup" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            </div>
          </div>
        )}

        {/* Display API response messages */}
        {apiError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-2 rounded bg-red-100 text-red-700 text-center text-sm"
          >
            {apiError}
          </motion.div>
        )}
        {apiMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-2 rounded bg-green-100 text-green-700 text-center text-sm"
          >
            {apiMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Additional fields for Sign Up */}
          {activeTab === "signup" && (
            <>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                  Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  placeholder="Enter your name"
                />
                {nameError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {nameError}
                  </motion.p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  placeholder="Enter your phone number"
                />
                {phoneError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {phoneError}
                  </motion.p>
                )}
              </div>
            </>
          )}

          {/* Common Email Field */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              placeholder="Enter your email"
            />
            {emailError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {emailError}
              </motion.p>
            )}
          </div>

          {/* Password Field (not needed for forgot password) */}
          {activeTab !== "forgot" && (
            <div>
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <i className={`ri-${showPassword ? "eye-off-line" : "eye-line"} text-lg`} />
                </button>
              </div>
              {passwordError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {passwordError}
                </motion.p>
              )}
              <div className="mt-2">
                <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                    className={`h-full ${getPasswordStrengthColor()}`}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Registration Type (only for Sign Up) */}
          {activeTab === "signup" && (
            <div>
              <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
                Register as
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="student"
                    checked={registerType === "student"}
                    onChange={() => setRegisterType("student")}
                    className="form-radio"
                  />
                  <span className="text-gray-700 dark:text-gray-200">Student</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="instructor"
                    checked={registerType === "instructor"}
                    onChange={() => setRegisterType("instructor")}
                    className="form-radio"
                  />
                  <span className="text-gray-700 dark:text-gray-200">Instructor</span>
                </label>
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isRedirecting || (activeTab === "forgot" && isResetSent)}
            className={`w-full py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center ${
              activeTab === "forgot" && isResetSent
                ? "bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed"
                : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
            }`}
          >
            {isRedirecting ? (
              // Spinner while processing the request
              <svg
                className="animate-spin h-5 w-5 text-white dark:text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : activeTab === "signin" ? (
              "Sign In"
            ) : activeTab === "signup" ? (
              "Sign Up"
            ) : (
              "Send Reset Link"
            )}
          </motion.button>
        </form>

        {/* Forgot Password link (only in Sign In mode) */}
        {activeTab === "signin" && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("forgot");
            }}
            className="block mt-6 text-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
          >
            Forgot Password?
          </motion.a>
        )}

        {/* In Forgot Password mode, show a back link and reset message */}
        {activeTab === "forgot" && (
          <div className="mt-6 text-center">
            {isResetSent ? (
              <p className="text-green-600 dark:text-green-400 text-sm">
                Link sent to email. Please wait {resetCountdown} seconds to resend.
              </p>
            ) : (
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("signin");
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm"
              >
                Back to Sign In
              </motion.a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
