const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Smart Loan Approval Predictor backend is running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "backend",
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});