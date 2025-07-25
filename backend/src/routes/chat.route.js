import express from "express"
import { protectRoute } from "../../middlewares/auth.middleware.js"
import { getStreamToken } from "../controllers/chat.controller.js"


const chatRoutes = express.Router()

chatRoutes.get("/token",protectRoute,getStreamToken)

export default chatRoutes