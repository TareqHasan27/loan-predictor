const getRoot = (req, res) => {
  res.json({
    message: "Smart Loan Approval Predictor backend is running",
  });
};

const getHealth = (req, res) => {
  res.json({
    status: "ok",
    service: "backend",
  });
};

module.exports = {
  getRoot,
  getHealth,
};