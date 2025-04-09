import React, { useState, useEffect } from "react";
import { Container, Box, TextField, Button, Typography, Grid } from "@mui/material";
import { Search } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../../helpers/apiCommunicators";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Adjust categories as needed.
  const categories = ["All", "Electronics", "Books", "Clothing", "Food", "Sports", "Other"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await getAllProducts();
      if (result.error) {
        setError(result.error);
      } else {
        // Fallback to an empty array if result.products is undefined.
        setAllProducts(result.products || []);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = (allProducts || []).filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
            Products
          </Typography>

          {/* Search and filter controls */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              InputProps={{ startAdornment: <Search sx={{ color: "gray", mr: 1 }} /> }}
              sx={{ maxWidth: { xs: "100%", sm: "400px" } }}
            />

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "contained" : "outlined"}
                  onClick={() => setSelectedCategory(cat === "All" ? "" : cat)}
                  sx={{
                    borderRadius: "20px",
                    backgroundColor: selectedCategory === cat ? "#ce3b3b" : "transparent",
                    borderColor: "#ce3b3b",
                    color: selectedCategory === cat ? "white" : "#ce3b3b",
                    "&:hover": {
                      backgroundColor: selectedCategory === cat ? "#b03232" : "rgba(206, 59, 59, 0.1)",
                      borderColor: "#ce3b3b",
                    },
                  }}
                >
                  {cat}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>

        {loading ? (
          <Typography variant="h6" align="center">
            Loading products...
          </Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error">
            {error}
          </Typography>
        ) : filteredProducts.length > 0 ? (
          <Grid container spacing={3}>
            {filteredProducts.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center">
            No products found.
          </Typography>
        )}
      </Container>
    </>
  );
}
