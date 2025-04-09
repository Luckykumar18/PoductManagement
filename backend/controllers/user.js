import User from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from "../utils/constants.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).json({ message: "User already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

 
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      secure: true,
      path: "/",
      sameSite: "none",
    });
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      signed: true,
      secure: true,
      path: "/",
      sameSite: "none",
      expires: expires,
    });
    
    return res.status(201).json({ message: "Signup successful", name: user.name, email: user.email, _id: user._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      secure: true,
      path: "/",
      sameSite: "none",
    });
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      signed: true,
      secure: true,
      path: "/",
      sameSite: "none",
      expires: expires,
    });

    return res.status(200).json({ message: "Login successful", name: user.name, email: user.email, _id: user._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered or Token malfunctioned" });
    }
    return res.status(200).json({ message: "OK", name: user.name, email: user.email, _id: user._id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered or Token malfunctioned" });
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      secure: true,
      path: "/",
      sameSite: "none",
    });
    return res.status(200).json({ message: "Logout successful", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
