import { generateStreamToken } from "../lib/stream.js";

export const getStreamToken =  async (req,res) => {
     try {
    const token = generateStreamToken(req.user.id);

    res.status(200).json({ token });
  } catch (error) {
     console.error("Erro ao pegar token do stream:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
  }
}