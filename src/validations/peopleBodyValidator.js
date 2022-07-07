const Joi = require('joi')

const paramsSchema =
    Joi.object({
        id: Joi.string().min(24).max(24).required() 
    });

const querySchema = Joi.alternatives().try(
    Joi.object({
        firstName: Joi.string().required(),
    }),
    Joi.object({
        lastName: Joi.string().required(),
    }),
    Joi.object({
        username: Joi.string().required(),
    }),
    Joi.object({})
);

const bodySchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).trim().required(),
  lastName: Joi.string().alphanum().min(3).max(30).trim().required(),
  username: Joi.string().min(6).max(16).required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  phone: Joi.string().min(9).max(13).required()
})

module.exports = {bodySchema, querySchema , paramsSchema} 
