import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import connectDB from "../config/db.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"
import path from "path"
connectDB()
dotenv.config()
const PORT = process.env.PORT || 4000

const __dirname = path.resolve()

const app = express()

app.use(express.json())

app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}





app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

