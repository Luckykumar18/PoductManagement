// models/product.model.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    // You can add a list of allowed categories if needed:
    enum: ['Electronics', 'Books', 'Clothing', 'Food', 'Sports', 'Other']
  },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  productImage: { type: String }, // URL to the product image
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
