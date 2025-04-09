// src/pages/EditProduct.jsx
import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProductDetails, updateProduct, deleteProduct } from "../../helpers/apiCommunicators";
import { useAuth } from "../context/AuthProvider";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["Electronics", "Books", "Clothing", "Food", "Sports", "Other"];

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getProductDetails(id);
      if (result.error) {
        setError(result.error);
        setLoading(false);
      } else {
        const product = result.product;
        if (!authUser || String(product.creator) !== String(authUser._id)) {
          navigate(`/products/${id}`, { replace: true });
          return;
        }
        setFormData({
          name: product.name || "",
          description: product.description || "",
          category: product.category || "",
          price: product.price || "",
          rating: product.rating || "",
        });
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProduct(id, formData);
    if (result.error) {
      setError(result.error);
    } else {
      navigate("/my-products", { replace: true });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(id);
      if (result.error) {
        setError(result.error);
      } else {
        navigate("/my-products", { replace: true });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex justify-center items-center py-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <br></br>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <br></br>
              <textarea
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 px-3 py-2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <br></br>
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
              <br></br>
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
              <br></br>
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
            <br></br>
            <div className="flex justify-center mt-8 space-x-4">
              <button
                type="submit"
                className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-600"
              >
                Update Product
              </button>
              <br></br>
              <br></br>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
              >
                Delete Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
