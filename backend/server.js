require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes =
  require("./auth");

const analyticsRoutes =
  require("./analytics");

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

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  res.status(500).json({
    message: "Server Error"
  });
});

const port = Number(process.env.PORT) || 5000;

app.listen(
  port,
  () => {
    console.log(
      `Server running on port ${port}`
    );
  }
);
