const { pool } = require("../config/db");

const createUser = async ({ name, email, passwordHash }) => {
  const query = `
    INSERT INTO users (name, email, password_hash)
    VALUES (?, ?, ?);
  `;

  const [result] = await pool.query(query, [name, email, passwordHash]);

  return {
    id: result.insertId,
    name,
    email,
  };
};

const findUserByEmail = async (email) => {
  const query = `
    SELECT id, name, email, password_hash, created_at
    FROM users
    WHERE email = ?
    LIMIT 1;
  `;

  const [rows] = await pool.query(query, [email]);

  return rows[0] || null;
};

const findUserById = async (id) => {
  const query = `
    SELECT id, name, email, created_at
    FROM users
    WHERE id = ?
    LIMIT 1;
  `;

  const [rows] = await pool.query(query, [id]);

  return rows[0] || null;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};