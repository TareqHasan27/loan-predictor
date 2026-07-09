const { predictLoanApproval } = require("../services/mlService");

const testMlService = async () => {
  const sampleLoanApplication = {
    gender: "Male",
    married: "Yes",
    dependents: "0",
    education: "Graduate",
    self_employed: "No",
    applicant_income: 5849,
    coapplicant_income: 0,
    loan_amount: 128,
    loan_amount_term: 360,
    credit_history: 1,
    property_area: "Urban",
  };

  try {
    const prediction = await predictLoanApproval(sampleLoanApplication);

    console.log("ML service call successful.");
    console.log("\nPrediction response:");
    console.log(prediction);
  } catch (error) {
    console.error("ML service test failed.");
    console.error(error.message);
    process.exitCode = 1;
  }
};

testMlService();