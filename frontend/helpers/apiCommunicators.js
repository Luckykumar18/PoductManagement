// src/helpers/apiCommunicators.js
import axios from "axios";

// ==================
// User Authentication
// ==================
export const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post("/api/users/signup", { name, email, password });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Signup failed" };
  }
};

// Removed OTP verification as it's not required for product management

export const loginUser = async (email, password, code) => {
  try {
    if (code) {
      const response = await axios.get(`/api/users/auth/google?code=${code}`);
      return response.data;
    } else {
      const response = await axios.post("/api/users/login", { email, password });
      return response.data;
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return { error: error.response?.data || "Login failed" };
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post("/api/users/logout", {});
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Logout failed" };
  }
};

export const verifyUserAPI = async () => {
  try {
    const res = await axios.get("/api/users/auth-status");
    if (res.data.message === "OK") {
      const userData = {
        name: res.data.name,
        email: res.data.email,
        _id: res.data._id,
      };
      return { user: userData };
    } else {
      return { error: "User not authenticated" };
    }
  } catch (error) {
    console.error("User verification failed:", error);
    return { error: error.response?.data?.message || "User verification failed" };
  }
};

// ==================
// Product Management Endpoints
// ==================

// Get details of a single product.
export const getProductDetails = async (id) => {
  try {
    const response = await axios.get(`/api/products/${id}`);
    return { product: response.data.product };
  } catch (error) {
    console.error("Error fetching product details:", error);
    return { error: "Failed to load product. Please try again later." };
  }
};

// Create a new product.
export const createProduct = async (data) => {
  try {
    const response = await axios.post("/api/products/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
    return {
      error: error.response?.data?.message || "Product creation failed. Please try again.",
    };
  }
};

// Update an existing product.
export const updateProduct = async (id, data) => {
  try {
    const response = await axios.patch(`/api/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Product update failed. Please try again." };
  }
};

// Delete a product.
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response?.data || error.message);
    return { error: error.response?.data?.message || "Product deletion failed. Please try again." };
  }
};

// Get all products with optional filtering (the filtering logic should be handled on the backend or in the Products page).
export const getAllProducts = async () => {
  try {
    const response = await axios.get("/api/products");
    // Make sure your API responds with something like { products: [...] }
    return { products: response.data.products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { error: "Failed to fetch products. Please try again later." };
  }
};

// Get products created by the authenticated user.
export const getMyProducts = async () => {
  try {
    console.log("hello2");
    const response = await axios.get("/api/products/my");
    // Assuming the backend responds with { products: [...] }
    if (response.data.message === "OK") {
      return { products: response.data.products };
    } else {
      return { error: "Failed to fetch your products." };
    }
  } catch (error) {
    console.error("Error fetching my products:", error);
    return { error: "Error fetching your products." };
  }
};
