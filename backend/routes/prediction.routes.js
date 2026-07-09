const express = require("express");

const {
  createLoanPrediction,
} = require("../controllers/prediction.controller");

const verifyToken = require("../middleware/verifyToken");
const validateRequest = require("../middleware/validateRequest");
const validatePredictionPayload = require("../validators/prediction.validator");

const router = express.Router();

router.post(
  "/",
  verifyToken,
  validatePredictionPayload,
  validateRequest,
  createLoanPrediction
);

module.exports = router;