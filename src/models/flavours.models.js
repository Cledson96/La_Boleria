import joi from "joi"

const flavoursschema = joi.object({
    name: joi.string().min(2).max(20).required()
  })

export default flavoursschema