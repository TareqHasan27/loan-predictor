const express = require("express");

const {
  getPredictionHistory,
} = require("../controllers/prediction.controller");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyToken, getPredictionHistory);

module.exports = router;