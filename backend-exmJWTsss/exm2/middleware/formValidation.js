const Joi = require('@hapi/joi')

//validacion de un registro
// const registerValidation = (data) => {
//     const schema = Joi.object({
//         name: Joi.string().min(6).required(),
//         email: Joi.string().min(6).required().email(),
//         password: Joi.string().min(6).required(),
//         roles: Joi.object({
//             admin: Joi.boolean().required(),
//             user: Joi.boolean(),
//             driver: Joi.boolean(),
//             seller: Joi.boolean()
//         })
//     })
//     return schema.validate(data)
// }
//registro sin roles
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        name: Joi.string()
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;