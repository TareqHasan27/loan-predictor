const { pool } = require("../config/db");

const createPredictionsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS predictions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      input_data JSON NOT NULL,
      prediction VARCHAR(20) NOT NULL,
      confidence DECIMAL(6, 4) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT fk_predictions_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
    );
  `;

  try {
    await pool.query(createTableQuery);

    console.log("Predictions table created or already exists.");

    const [tables] = await pool.query("SHOW TABLES;");
    console.log("\nCurrent database tables:");
    console.table(tables);

    const [columns] = await pool.query("DESCRIBE predictions;");
    console.log("\nPredictions table structure:");
    console.table(columns);
  } catch (error) {
    console.error("Failed to create predictions table.");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

createPredictionsTable();