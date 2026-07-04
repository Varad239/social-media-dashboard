const express = require("express");
const pool = require("./db");

const router = express.Router();
const MAX_IMPORT_ROWS = 500;

function toMetric(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    return 0;
  }

  return Math.trunc(number);
}

function firstValue(source, keys) {
  for (const key of keys) {
    const value = source[key];
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return undefined;
}

function normalizeAnalytics(body) {
  const payload = body || {};

  return {
    followers: toMetric(payload.followers),
    likes: toMetric(payload.likes),
    comments: toMetric(payload.comments),
    shares: toMetric(payload.shares)
  };
}

function normalizeXquikPosts(posts) {
  return posts.slice(0, MAX_IMPORT_ROWS).reduce(
    (metrics, post) => {
      if (!post || typeof post !== "object") {
        return metrics;
      }

      metrics.likes += toMetric(
        firstValue(post, ["likes", "like_count", "likeCount"])
      );
      metrics.comments += toMetric(
        firstValue(post, ["comments", "replies", "reply_count", "replyCount"])
      );
      metrics.shares += toMetric(
        firstValue(post, ["shares", "retweets", "retweet_count", "retweetCount"])
      );
      metrics.followers += toMetric(
        firstValue(post, ["followers", "view_count", "viewCount", "views"])
      );
      metrics.importedRows += 1;

      return metrics;
    },
    {
      followers: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      importedRows: 0
    }
  );
}

router.get("/", async (req, res) => {
  const result =
    await pool.query(
      "SELECT * FROM analytics"
    );

  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const metrics = normalizeAnalytics(req.body);

  await pool.query(
    `INSERT INTO analytics
     (followers,likes,comments,shares)
     VALUES($1,$2,$3,$4)`,
    [
      metrics.followers,
      metrics.likes,
      metrics.comments,
      metrics.shares
    ]
  );

  res.json({
    message: "Data Added",
    analytics: metrics
  });
});

router.post("/xquik", async (req, res) => {
  const { posts } = req.body;

  if (!Array.isArray(posts) || posts.length === 0) {
    return res.status(400).json({
      message: "Request body must include a non-empty posts array"
    });
  }

  const metrics = normalizeXquikPosts(posts);

  if (metrics.importedRows === 0) {
    return res.status(400).json({
      message: "No valid Xquik rows found"
    });
  }

  await pool.query(
    `INSERT INTO analytics
     (followers,likes,comments,shares)
     VALUES($1,$2,$3,$4)`,
    [
      metrics.followers,
      metrics.likes,
      metrics.comments,
      metrics.shares
    ]
  );

  res.json({
    message: "Xquik Data Added",
    analytics: metrics,
    rowLimit: MAX_IMPORT_ROWS
  });
});

module.exports = router;
