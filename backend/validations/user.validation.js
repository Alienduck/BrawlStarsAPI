import joi from "joi";

export default function userValidation(body){
    const userCreate = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    
    })

    const userUpdate = joi.object({
      email: joi.string().email(),
      password: joi.string(),
    
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
