import { StreamChat } from "stream-chat"
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET


if (!apiKey || !apiSecret) {
    console.log("Chaves de api do Stream inválidas")
}


const streamClient = StreamChat.getInstance(apiKey, apiSecret)


export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData])
        return userData
    } catch (error) {
        console.log("erro ao criar usuário no Stream",error)
    }
}


export const generateStreamToken = (userId) => {
    // Todo
}

