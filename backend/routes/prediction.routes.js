const express = require("express");

const {
  createLoanPrediction,
} = require("../controllers/prediction.controller");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/", verifyToken, createLoanPrediction);

module.exports = router;