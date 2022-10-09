const { requestError } = require("../utils");

const validateBody = (validateSchema) => {
  const func = (req, res, next) => {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      next(requestError(400, error.message));
    }
    next();
  };
  return func;
};
module.exports = validateBody;
