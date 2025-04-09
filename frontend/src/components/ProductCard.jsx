import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Chip, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Card
      sx={{
        minWidth: { xs: "98%", sm: 345 },
        maxWidth: 345,
        height: 500,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 200,
          width: "100%",
          objectFit: "cover",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        image={product.productImage || "/placeholder-image.jpg"}
        alt={product.name}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Chip label={product.category} size="small" sx={{ backgroundColor: "#c53030", color: "white" }} />
          <Typography variant="subtitle2" color="text.secondary">
            ${product.price}
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.2,
            minHeight: "2.4em",
          }}
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.5,
            minHeight: "4.5em",
          }}
        >
          {product.description}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Rating: {product.rating} / 5
        </Typography>
        <Button
          component={Link}
          to={`/products/${product._id}`}
          variant="contained"
          fullWidth
          sx={{
            mt: "auto",
            backgroundColor: "#c53030",
            "&:hover": { backgroundColor: "#9b1c1c" },
            textTransform: "none",
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
