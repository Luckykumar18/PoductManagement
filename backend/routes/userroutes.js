// routes/userroutes.js
import express from "express";
const router = express.Router();
import verifyToken from "../utils/verifytoken.js";
import * as userControllers from "../controllers/user.js";

router.post("/signup", userControllers.signup);
router.post("/login", userControllers.login);
router.get("/auth-status", verifyToken, userControllers.verifyUser);
router.post("/logout", verifyToken, userControllers.userLogout);

export default router;
