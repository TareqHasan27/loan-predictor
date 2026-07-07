const express = require("express");

const {
  getRoot,
  getHealth,
} = require("../controllers/health.controller");

const router = express.Router();

router.get("/", getRoot);
router.get("/health", getHealth);

module.exports = router;