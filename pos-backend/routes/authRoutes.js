import express from "express";
import {
  login,
  register,
  verifyToken,
  getUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/verify", protect, verifyToken);
router.get("/profile", protect, getUserProfile);

export default router;
