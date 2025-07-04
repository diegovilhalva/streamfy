import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import doteenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
doteenv.config()
const PORT = process.env.PORT || 4000


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())




app.get("/",(req,res) => {
    res.send("Servidor ok")
})

app.use("/api/auth",authRoutes)

app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

