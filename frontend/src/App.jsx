// src/App.jsx
import { Route, Routes } from "react-router-dom";
import "./index.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import MyProducts from "./pages/MyProducts";
import ProductDetail from "./pages/ProductDetail";
import EditProduct from "./pages/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthProvider";

function App() {
  const { authUser } = useAuth();

  return (
    <main className="min-h-screen mx-auto">
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-products"
          element={
            <ProtectedRoute>
              <MyProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Products />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Products />}
        />
      </Routes>
    </main>
  );
}

export default App;
