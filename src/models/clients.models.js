import joi from "joi"

const clientsschema = joi.object({
    name: joi.string().min(2).max(20).required(),
    address: joi.string().required(),
    phone: joi.string().required().min(10).max(11)
})

export default clientsschema