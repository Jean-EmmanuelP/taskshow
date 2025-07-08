import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { authAPI } from "../api";
import { FaLock, FaEnvelope, FaExclamationCircle, FaSpinner, FaTasks, FaUsers, FaChartBar, FaShieldAlt } from "react-icons/fa";

const Landing = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeFAQ, setActiveFAQ] = useState(null);
  
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Input validation
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    
    // Reset previous errors
    setError("");
    setLoading(true);
    
    try {
      // Call backend API for authentication
      const response = await authAPI.login({ email, password });
      
      // Store authentication data
      localStorage.setItem("token", response.token);
      localStorage.setItem("userRole", response.role);
      localStorage.setItem("email", email);
      
      // Update authentication context
      login(email);
      
      // Navigate to appropriate dashboard
      navigate(response.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-white text-gray-900">
      {/* Hero Section with Login */}
      <div className="relative flex flex-col items-center justify-center text-center py-20 px-6">
        <h1
          className="text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-6"
        >
          Welcome to <span className="block">TaskFlow</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mb-8">
          Boost your productivity, streamline your workflow, and collaborate in real-time.
        </p>

        {/* Login Card */}
        <div
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
            <p className="text-gray-600">Access your dashboard</p>
          </div>

          {/* Error display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded animate-pulse" role="alert">
              <div className="flex items-center">
                <FaExclamationCircle className="text-red-500 mr-2" />
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105"
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Additional options */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 bg-white" id="features">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Powerful Features for <span className="text-blue-600">Productivity</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaTasks className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Task Management</h3>
              <p className="text-gray-600">Organize and track your tasks efficiently</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaUsers className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Work together seamlessly with your team</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaChartBar className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics</h3>
              <p className="text-gray-600">Get insights into your productivity</p>
            </div>

            {/* Feature 4 */}
            <div className="text-center group">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaShieldAlt className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Security</h3>
              <p className="text-gray-600">Your data is safe and secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-6 bg-gray-50" id="faq">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "How do I get started with TaskFlow?",
                answer: "Simply sign up for a free account and start creating your first tasks. Our intuitive interface makes it easy to get started."
              },
              {
                question: "Can I collaborate with my team?",
                answer: "Yes! TaskFlow offers powerful collaboration features that allow you to work with your team in real-time."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We use industry-standard encryption and security measures to protect your data."
              },
              {
                question: "What pricing plans are available?",
                answer: "We offer flexible pricing plans to suit different needs. Contact us for more information."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                    <span className="text-gray-500 text-2xl">
                      {activeFAQ === index ? "−" : "+"}
                    </span>
                  </div>
                </button>
                {activeFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TaskFlow</h3>
              <p className="text-gray-400">
                Streamline your productivity and collaborate effectively with TaskFlow.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
                <li><button onClick={scrollToTop} className="hover:text-white">Back to Top</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
