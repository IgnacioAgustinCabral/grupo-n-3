const {validationResult, checkSchema} = require("express-validator");

const validateRequestBySchema = (schema) => {
  return async (req, res, next) => {
    await checkSchema(schema).run(req);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({errors: errors.array()});
  };
};

module.exports = {
  validateRequestBySchema,
};
