import mongoose from "mongoose"
import "dotenv/config"


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Banco de dados conectado")
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados",error.message)
        process.exit(1)
    }
}


export default connectDB