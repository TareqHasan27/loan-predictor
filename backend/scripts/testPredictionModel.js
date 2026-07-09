const { pool } = require("../config/db");
const { createUser } = require("../models/User");
const {
  createPrediction,
  findPredictionsByUserId,
} = require("../models/Prediction");

const testPredictionModel = async () => {
  const testEmail = `prediction_test_${Date.now()}@example.com`;

  try {
    const testUser = await createUser({
      name: "Prediction Test User",
      email: testEmail,
      passwordHash: "fake_hashed_password_for_testing",
    });

    console.log("Temporary test user created:");
    console.log(testUser);

    const sampleInputData = {
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

    const createdPrediction = await createPrediction({
      userId: testUser.id,
      inputData: sampleInputData,
      prediction: "Approved",
      confidence: 0.8421,
    });

    console.log("\nPrediction created successfully:");
    console.log(createdPrediction);

    const userPredictions = await findPredictionsByUserId(testUser.id);

    console.log("\nPredictions found for test user:");
    console.log(userPredictions);

    await pool.query("DELETE FROM users WHERE id = ?;", [testUser.id]);

    console.log("\nTemporary test user cleaned up successfully.");
    console.log("Related prediction rows should also be deleted by ON DELETE CASCADE.");
  } catch (error) {
    console.error("Prediction model test failed.");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

testPredictionModel();