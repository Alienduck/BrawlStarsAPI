import joi from "joi";

export default function userValidation(body){
    const userCreate = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
        playerTags: joi.array().items(joi.string()),
        clubTags: joi.array().items(joi.string())
    })

    const userUpdate = joi.object({
        email: joi.string().email(),
        password: joi.string(),
        playerTags: joi.array().items(joi.string()),
        clubTags: joi.array().items(joi.string())
    })

    const userLogin = joi.object({
        email: joi.string().email(),
        password: joi.string(),
    })

    return {
        userCreate: userCreate.validate(body),
        userUpdate: userUpdate.validate(body),
        userLogin: userLogin.validate(body),
    }
}