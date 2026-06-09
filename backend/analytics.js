const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  const result =
    await pool.query(
      "SELECT * FROM analytics"
    );

  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const {
    followers,
    likes,
    comments,
    shares
  } = req.body;

  await pool.query(
    `INSERT INTO analytics
     (followers,likes,comments,shares)
     VALUES($1,$2,$3,$4)`,
    [
      followers,
      likes,
      comments,
      shares
    ]
  );

  res.json({
    message: "Data Added"
  });
});

module.exports = router;