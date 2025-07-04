import Joi from "joi"
export const signUpSchema = Joi.object({
    fullName: Joi.string().required().messages({
        "string.empty": "O nome completo é obrigatório"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email inválido",
        "string.empty": "O email é obrigatório"
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "A senha deve ter no mínimo 6 caracteres",
        "string.empty": "A senha é obrigatória"
    })
})


export const loginSchema = Joi.object({
        email: Joi.string().email().required().messages({
            "string.email": "Email inválido",
            "string.empty": "O email é obrigatório"
        }),
        password: Joi.string().required().messages({
            "string.empty": "A senha é obrigatória"
        })
})