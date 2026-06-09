require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes =
  require("./routes/auth");

const analyticsRoutes =
  require("./routes/analytics");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/analytics",
  analyticsRoutes
);

app.get("/", (req, res) => {
  res.send(
    "Social Dashboard API Running"
  );
});

app.listen(
  process.env.PORT,
  () => {
    console.log(
      `Server running on port ${process.env.PORT}`
    );
  }
);