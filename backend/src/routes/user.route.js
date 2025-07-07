import express from "express"
import { protectRoute } from "../../middlewares/auth.middleware.js"
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest } from "../controllers/user.controller.js"

const userRoutes = express.Router()

userRoutes.use(protectRoute)

userRoutes.get("/",getRecommendedUsers)

userRoutes.get("/friends",getMyFriends)

userRoutes.post("/friend-request/:id", sendFriendRequest)

userRoutes.post("/friend-request/:id/accept", acceptFriendRequest)

userRoutes.get("/friend-requests", getFriendRequests)

userRoutes.get("/outgoing-friend-requests", getOutgoingFriendReqs)


export default userRoutes