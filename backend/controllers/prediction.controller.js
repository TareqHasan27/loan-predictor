const { createPrediction } = require("../models/Prediction");
const { predictLoanApproval } = require("../services/mlService");

const REQUIRED_FIELDS = [
  "gender",
  "married",
  "dependents",
  "education",
  "self_employed",
  "applicant_income",
  "coapplicant_income",
  "loan_amount",
  "loan_amount_term",
  "credit_history",
  "property_area",
];

const validatePredictionRequest = (body) => {
  const missingFields = REQUIRED_FIELDS.filter(
    (field) => body[field] === undefined || body[field] === null || body[field] === ""
  );

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(", ")}`;
  }

  return null;
};

const createLoanPrediction = async (req, res, next) => {
  try {
    const validationError = validatePredictionRequest(req.body);

    if (validationError) {
      res.status(400);
      throw new Error(validationError);
    }

    const mlPrediction = await predictLoanApproval(req.body);

    const savedPrediction = await createPrediction({
      userId: req.user.id,
      inputData: req.body,
      prediction: mlPrediction.prediction,
      confidence: mlPrediction.confidence,
    });

    res.status(201).json({
      success: true,
      message: "Prediction completed successfully",
      result: {
        prediction: mlPrediction.prediction,
        prediction_class: mlPrediction.prediction_class,
        confidence: mlPrediction.confidence,
        probability_rejected: mlPrediction.probability_rejected,
        probability_approved: mlPrediction.probability_approved,
      },
      saved_prediction: savedPrediction,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLoanPrediction,
};