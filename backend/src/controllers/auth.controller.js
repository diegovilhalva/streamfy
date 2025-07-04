
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { loginSchema, signUpSchema } from "../validators/auth.validator.js"




export const signUp = async (req, res) => {

    try {
        const { error } = signUpSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        }
        const { fullName, email, password } = req.body


        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Este email já está em uso" })
        }

        const idx = Math.floor(Math.random() * 100)

        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        })

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(201).json({ success: true, user: newUser })

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}


export const login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "Email ou senha inválidos" })
        }

        const isMatch = await user.matchPassword(password)


        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Email ou senha inválidos" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })

        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        return res.status(200).json({ success: true, user })


    } catch (error) {
        console.error("Erro ao fazer login:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ success: true, message: "Logout realizado com sucesso" })
    } catch (error) {
        console.error("Erro ao fazer logout:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}