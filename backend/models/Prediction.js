const { pool } = require("../config/db");

const createPrediction = async ({
  userId,
  inputData,
  prediction,
  confidence,
}) => {
  const query = `
    INSERT INTO predictions (user_id, input_data, prediction, confidence)
    VALUES (?, ?, ?, ?);
  `;

  const [result] = await pool.query(query, [
    userId,
    JSON.stringify(inputData),
    prediction,
    confidence,
  ]);

  return {
    id: result.insertId,
    user_id: userId,
    input_data: inputData,
    prediction,
    confidence,
  };
};

const findPredictionsByUserId = async (userId) => {
  const query = `
    SELECT id, user_id, input_data, prediction, confidence, created_at
    FROM predictions
    WHERE user_id = ?
    ORDER BY created_at DESC;
  `;

  const [rows] = await pool.query(query, [userId]);

  return rows.map((row) => ({
    ...row,
    input_data:
      typeof row.input_data === "string"
        ? JSON.parse(row.input_data)
        : row.input_data,
    confidence: Number(row.confidence),
  }));
};

module.exports = {
  createPrediction,
  findPredictionsByUserId,
};