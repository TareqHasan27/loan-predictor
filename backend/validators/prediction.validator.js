const { body } = require("express-validator");

const validatePredictionPayload = [
  body("gender")
    .exists({ checkFalsy: true })
    .withMessage("gender is required")
    .bail()
    .isIn(["Male", "Female"])
    .withMessage("gender must be either Male or Female"),

  body("married")
    .exists({ checkFalsy: true })
    .withMessage("married is required")
    .bail()
    .isIn(["Yes", "No"])
    .withMessage("married must be either Yes or No"),

  body("dependents")
    .exists({ checkFalsy: true })
    .withMessage("dependents is required")
    .bail()
    .isIn(["0", "1", "2", "3+"])
    .withMessage("dependents must be one of: 0, 1, 2, 3+"),

  body("education")
    .exists({ checkFalsy: true })
    .withMessage("education is required")
    .bail()
    .isIn(["Graduate", "Not Graduate"])
    .withMessage("education must be either Graduate or Not Graduate"),

  body("self_employed")
    .exists({ checkFalsy: true })
    .withMessage("self_employed is required")
    .bail()
    .isIn(["Yes", "No"])
    .withMessage("self_employed must be either Yes or No"),

  body("applicant_income")
    .exists()
    .withMessage("applicant_income is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("applicant_income must be a non-negative number")
    .toFloat(),

  body("coapplicant_income")
    .exists()
    .withMessage("coapplicant_income is required")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("coapplicant_income must be a non-negative number")
    .toFloat(),

  body("loan_amount")
    .exists()
    .withMessage("loan_amount is required")
    .bail()
    .custom((value) => Number(value) > 0)
    .withMessage("loan_amount must be greater than 0")
    .toFloat(),

  body("loan_amount_term")
    .exists()
    .withMessage("loan_amount_term is required")
    .bail()
    .custom((value) => Number(value) > 0)
    .withMessage("loan_amount_term must be greater than 0")
    .toFloat(),

  body("credit_history")
    .exists()
    .withMessage("credit_history is required")
    .bail()
    .isIn([0, 1, "0", "1"])
    .withMessage("credit_history must be either 0 or 1")
    .toInt(),

  body("property_area")
    .exists({ checkFalsy: true })
    .withMessage("property_area is required")
    .bail()
    .isIn(["Urban", "Semiurban", "Rural"])
    .withMessage("property_area must be one of: Urban, Semiurban, Rural"),
];

module.exports = validatePredictionPayload;