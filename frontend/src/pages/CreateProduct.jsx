// src/pages/CreateProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createProduct } from "../../helpers/apiCommunicators";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: "",
    image: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Adjust categories as needed.
  const categories = ["Electronics", "Books", "Clothing", "Food", "Sports", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object for file upload.
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    if (formData.image) {
      data.append("image", formData.image);
    }

    setLoading(true);
    setError(null);

    const result = await createProduct(data);
    if (result.error) {
      setError(result.error);
    } else {
      navigate("/my-products");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex justify-center items-center py-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
              <input
                type="number"
                required
                min="0"
                max="5"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Image</label>
              <input
                type="file"
                accept="image/*"
                required
                className="mt-1 block w-full"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-600"
                disabled={loading}
              >
                {loading ? "Creating Product..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
