const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("./db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword =
    await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3)",
    [name, email, hashedPassword]
  );

  res.json({
    message: "User Registered"
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result =
    await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

  if (result.rows.length === 0) {
    return res.status(400).json({
      message: "User Not Found"
    });
  }

  const user = result.rows[0];

  const match =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!match) {
    return res.status(400).json({
      message: "Invalid Password"
    });
  }

  const token = jwt.sign(
    {
      id: user.id
    },
    process.env.JWT_SECRET
  );

  res.json({
    token
  });
});

module.exports = router;
