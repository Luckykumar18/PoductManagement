// index.js (Backend)
import express from 'express';
import { createServer } from "http";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userroutes.js';
import productRoutes from './routes/productroutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static('public'));
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));

const URI = process.env.MongoDBURI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(URI, clientOptions)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
