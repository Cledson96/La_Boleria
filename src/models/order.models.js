import joi from "joi"

const orderschema = joi.object({
    clientId: joi.number().required(),
    cakeId: joi.number().required(),
    quantity: joi.number().required(),
    totalPrice: joi.number().required()
})

export default orderschema