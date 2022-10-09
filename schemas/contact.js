const joi = require("joi");

const validateSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().min(5).email({ minDomainSegments: 2 }).required(),
  phone: joi.string().min(3).required(),
});

module.exports = validateSchema;
