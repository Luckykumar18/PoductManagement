// models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  // If you want, you can add additional fields like role (admin/user) later.
});

const User = mongoose.model('User', userSchema);
export default User;
