import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../../helpers/apiCommunicators';
import { useAuth } from '../context/AuthProvider';
import Navbar from './Navbar';

export default function Signup() {
  const { setAuthUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await signupUser(name, email, password);
    if (res.error) {
      setError(res.error);
      return;
    }

    // Set authenticated user and navigate to "My Products"
    setAuthUser({ name: res.name, email: res.email, _id: res._id });
    navigate("/my-products", { replace: true });
  };

  return (
    <>
      <Navbar />
      <div className="my-20 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Create your account
            </h2>
          </div>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            <div className="rounded-md shadow-sm space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="w-full p-2 bg-red-700 text-white rounded">
              Sign Up
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-red-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
