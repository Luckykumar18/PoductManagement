// src/pages/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import { getProductDetails } from "../../helpers/apiCommunicators";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const fetchProductDetails = async () => {
    const result = await getProductDetails(id);
    if (result.error) {
      setError(result.error);
    } else {
      setProduct(result.product);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (error) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h6">Loading product...</Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <img
            src={product.productImage || "/placeholder-image.jpg"}
            alt={product.name}
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px" }}
          />
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Category: {product.category}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Price: ${product.price}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Rating: {product.rating} / 5
        </Typography>
        <Button variant="contained" onClick={() => navigate(`/products/${id}/edit`)}>
          Edit Product
        </Button>
      </Container>
    </>
  );
}
