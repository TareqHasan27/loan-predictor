const { pool } = require("../config/db");
const {
  createUser,
  findUserByEmail,
  findUserById,
} = require("../models/User");

const testUserModel = async () => {
  const testEmail = `testuser_${Date.now()}@example.com`;

  try {
    const createdUser = await createUser({
      name: "Test User",
      email: testEmail,
      passwordHash: "fake_hashed_password_for_testing",
    });

    console.log("User created successfully:");
    console.log(createdUser);

    const foundByEmail = await findUserByEmail(testEmail);

    console.log("\nUser found by email:");
    console.log(foundByEmail);

    const foundById = await findUserById(createdUser.id);

    console.log("\nUser found by ID:");
    console.log(foundById);

    await pool.query("DELETE FROM users WHERE email = ?;", [testEmail]);

    console.log("\nTest user cleaned up successfully.");
  } catch (error) {
    console.error("User model test failed.");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

testUserModel();