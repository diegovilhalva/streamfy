import express from "express"
import { login, logout, onBoarding, signUp } from "../controllers/auth.controller.js"
import { protectRoute } from "../../middlewares/auth.middleware.js"

const authRoutes = express.Router()

authRoutes.post("/signup",signUp)
authRoutes.post("/login",login)
authRoutes.post("/logout",logout)
authRoutes.post("/onboarding",protectRoute,onBoarding)
authRoutes.get("/me", protectRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
})

export default authRoutes