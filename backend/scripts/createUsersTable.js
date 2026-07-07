const { pool } = require("../config/db");

const createUsersTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);

    console.log("Users table created or already exists.");

    const [tables] = await pool.query("SHOW TABLES;");
    console.log("\nCurrent database tables:");
    console.table(tables);

    const [columns] = await pool.query("DESCRIBE users;");
    console.log("\nUsers table structure:");
    console.table(columns);
  } catch (error) {
    console.error("Failed to create users table.");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

createUsersTable();