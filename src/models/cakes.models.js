import joi from "joi"


const cakeschema = joi.object({
    name:joi.string().min(2).max(20).required(),
    price:joi.number().min(0,1).required(),
    description:joi.string(),
    image:joi.string().required(),
    flavourid: joi.number().required()
})

export default cakeschema