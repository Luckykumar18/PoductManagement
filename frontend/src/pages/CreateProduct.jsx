import { useState } from "react";
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
  const [previewImage, setPreviewImage] = useState(null);

  const categories = ["Electronics", "Books", "Clothing", "Food", "Sports", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 py-8 px-6 text-center">
            <h2 className="text-3xl font-bold text-white">Create New Product</h2>
            <p className="text-red-100 mt-2">Fill in the details to list your product</p>
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-10 lg:p-12">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter product name"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-red-500 focus:border-red-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <br></br>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <br>
                </br>
                <br></br>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your product"
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-red-500 focus:border-red-500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Category */}
              <div>
                <br></br>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  required
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-red-500 focus:border-red-500"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <br></br>

              {/* Price and Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    step={0.01}
                    placeholder="Enter price"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-red-500 focus:border-red-500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                  <br></br>
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (0–5)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    max={5}
                    step={0.1}
                    placeholder="Enter rating"
                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-red-500 focus:border-red-500"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <br></br>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                {previewImage && (
                  <img src={previewImage} alt="" className="w-full h-auto mt-2 mb-4 rounded-md" />
                )}
                <input
                  type="file"
                  accept=".jpg,.png,.jpeg,.gif"
                  onChange={handleImageChange}
                  required
                  className="block w-full rounded-lg border border-gray-300 px-auto py-auto focus:ring-red focus:border-transparent"
                />
              </div>
              <br></br>
              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-auto px-auto shadow-xl hover:-translate-y transition-all duration ${
                  loading ? "bg-gradient-to-r from-orange" : "bg-gradient-to-r hover:-translate opacity "
                }`}
              >
                Submit!
              </button>

            </form>
              </div> 
            </div>
          </div>
        </>
  )
};

