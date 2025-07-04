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


export const onBoardingSchema = Joi.object({
    fullName: Joi.string().required().messages({
        "string.empty": "O nome completo é obrigatório"
    }),
    bio: Joi.string().max(500).allow("", null).messages({
        "string.max": "A biografia deve ter no máximo 500 caracteres"
    }),
    nativeLanguage: Joi.string().allow("", null).messages({
        "string.base": "A língua nativa deve ser um texto"
    }),
    learningLanguage: Joi.string().allow("", null).messages({
        "string.base": "A língua que está aprendendo deve ser um texto"
    }),
    location: Joi.string().allow("", null).messages({
        "string.base": "A localização deve ser um texto"
    }),
})
