
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { loginSchema, onBoardingSchema, signUpSchema } from "../validators/auth.validator.js"
import { upsertStreamUser } from "../lib/stream.js"




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

        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || ""
            })
            console.log(`Stream usuário criado para ${newUser.fullName}`);
        } catch (error) {
            console.log("Erro ao criar usuário stream:", error);
        }

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


export const onBoarding = async (req, res) => {
    try {
        const { error } = onBoardingSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message })
        }

        const userId = req.user._id
        const { fullName, bio, nativeLanguage, learningLanguage, location,profilePic } = req.body

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                fullName,
                bio,
                nativeLanguage,
                learningLanguage,
                location,
                profilePic,
                isOnboarded: true,
            },
            { new: true }
        )

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "Usuário não encontrado" })
        }

        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || "",
            })
            console.log(`Usuário atualizado no Stream: ${updatedUser.fullName}`)
        } catch (streamError) {
            console.error("Erro ao atualizar usuário no Stream:", streamError.message)
        }

        res.status(200).json({ success: true, user: updatedUser })

    } catch (error) {
        console.error("Erro no onboarding:", error)
        return res.status(500).json({ success: false, message: "Erro interno do servidor" })
    }
}