// routes/productroutes.js
import express from "express";
const router = express.Router();
import verifyToken from "../utils/verifytoken.js";
import * as productControllers from "../controllers/product.js";
import upload from "../middleware/upload.js";

// Create a product (optionally with image upload)
router.post("/create", verifyToken, upload.single("image"), productControllers.createProduct);

// Get all products with optional filtering and search via query params
router.get("/", productControllers.getAllProducts);

router.get("/my", verifyToken, productControllers.getMyProducts);

// Get a single product by its id
router.get("/:id", productControllers.getProduct);

// Update a product (only the creator should be able to update if you so choose)
router.patch("/:id", verifyToken, upload.single("image"), productControllers.editProduct);

// Delete a product
router.delete("/:id", verifyToken, productControllers.deleteProduct);

export default router;
