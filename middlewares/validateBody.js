const { validateSchema } = require("../schemas");
const { requestError } = require("../utils");

const validateBody = (message) => {
  const func = (req, res, next) => {
    const { error } = validateSchema.validate(req.body);
    if (error) {
      next(requestError(400, message));
    }
    next();
  };
  return func;
};
module.exports = validateBody;
