const {
  createPrediction,
  findPredictionsByUserId,
} = require("../models/Prediction");

const { predictLoanApproval } = require("../services/mlService");

const createLoanPrediction = async (req, res, next) => {
  try {
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

const getPredictionHistory = async (req, res, next) => {
  try {
    const predictions = await findPredictionsByUserId(req.user.id);

    res.json({
      success: true,
      count: predictions.length,
      predictions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLoanPrediction,
  getPredictionHistory,
};