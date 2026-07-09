const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);

    const formattedErrors = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    const validationError = new Error("Validation failed");
    validationError.details = formattedErrors;

    return next(validationError);
  }

  next();
};

module.exports = validateRequest;