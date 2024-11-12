import { useState } from "react";
import { User, Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { createUser } from "../zustands/user";

const SignUp = () => {
  const { signup, loading } = createUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    await signup(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-300 p-4 overflow-hidden">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-green-600 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Name
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 transition duration-200">
              <User className="text-gray-400 mr-2" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 transition duration-200">
              <Mail className="text-gray-400 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 transition duration-200">
              <Lock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-1"
            >
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-500 transition duration-200">
              <Lock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition duration-500 shadow-lg flex items-center justify-center"
          >
            {loading ? <Loader className="animate-spin w-5 h-5" /> : "Sign Up"}
          </button>
          <p className="text-center text-gray-600 mt-4">
            Sizda account bormi?{" "}
            <Link
              to="/login"
              className="text-green-600 font-medium hover:underline"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
