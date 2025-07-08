import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import connectDB from "../config/db.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
connectDB()
dotenv.config()
const PORT = process.env.PORT || 4000


const app = express()

app.use(express.json())

app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))




app.get("/", (req, res) => {
    res.send("Servidor ok")
})

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

