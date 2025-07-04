import jwt from "jsonwebtoken"
import User from "../src/models/User.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({ success: false, message: "Acesso não autorizado: token ausente." })
        }

        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (jwtError) {
            return res.status(401).json({ success: false, message: "Token inválido ou expirado." })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(401).json({ success: false, message: "Usuário não encontrado." })
        }

        req.user = user
        next()

    } catch (error) {
        console.error("Erro no middleware de autenticação:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor." })
    }
}
