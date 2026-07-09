const path = require("path");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const predictLoanApproval = async (loanApplicationData) => {
  const mlServiceUrl = process.env.ML_SERVICE_URL;

  if (!mlServiceUrl) {
    throw new Error("ML_SERVICE_URL is not configured");
  }

  try {
    const response = await axios.post(
      `${mlServiceUrl}/predict`,
      loanApplicationData,
      {
        timeout: 10000,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `ML service error: ${error.response.status} - ${JSON.stringify(
          error.response.data
        )}`
      );
    }

    if (error.request) {
      throw new Error("ML service is not reachable");
    }

    throw new Error(`Failed to call ML service: ${error.message}`);
  }
};

module.exports = {
  predictLoanApproval,
};