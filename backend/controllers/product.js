import Product from "../model/product.model.js";
import cloudinary from "../cloudconfig.js";
import fs from 'fs';
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink);

export const createProduct = async (req, res) => {
  try {
    let productImage = "";
    if (req.file) {
      
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products'
      });
      productImage = result.secure_url;
   
      await unlinkAsync(req.file.path);
    }

    const { name, description, category, price, rating } = req.body;
    const creator = res.locals.jwtData.id; 

    const product = new Product({
      name,
      description,
      category,
      price,
      rating,
      productImage,
      creator
    });
    await product.save();
    return res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error in createProduct:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
  
    const { category, minPrice, maxPrice, search, sortBy } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    let query = Product.find(filter);
    if (sortBy) {
      
      query = query.sort(sortBy);
    }

    const products = await query;
    return res.status(200).json({ message: "OK", products });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "OK", product });
  } catch (error) {
    console.error("Error in getProduct:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    
    
    if (product.creator.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { name, description, category, price, rating } = req.body;
    
   
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'products' });
      product.productImage = result.secure_url;
      await unlinkAsync(req.file.path);
    }
    
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.price = price || product.price;
    product.rating = rating || product.rating;
    await product.save();
    
    return res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.error("Error in editProduct:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    
   
    if (product.creator.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const getMyProducts = async (req, res) => {
    try {
      const userId = res.locals.jwtData._id; 
  
      const products = await Product.find({ creator: userId });
  
      res.status(200).json({ message: "OK", products });
    } catch (error) {
      console.error("Error in getMyProducts:", error);
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };
