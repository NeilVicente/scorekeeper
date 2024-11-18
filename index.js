// index.js
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { HighScore, Game } = require("./models");
const app = express();
const port = 3000;

// Middleware to enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

// Middleware to parse JSON requests
app.use(express.json());

app.get("/games", async (req, res) => {
  try {
    const games = await Game.findAll();
    const data = games.map((game) => ({
      id: game.id,
      name: game.name,
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

// Endpoint to get high scores for a specific game
app.get("/games/:gameId/highscores", async (req, res) => {
  const { gameId } = req.params;


  try {
    const scores = await HighScore.findAll({
      where: { gameId },
      order: [["score", "DESC"]],
      limit: 10,
    });
    res.json(scores.map((score) => ({
      player_name: score.player_name,
      score: score.score,
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to add a new high score for a specific game
app.post("/games/:gameId/highscores", async (req, res) => {
  const { gameId } = req.params;
  const { player_name, score } = req.body;
  if (!player_name || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }

  const game = await Game.findOne({
    where: { id: gameId },
  });

  if (!game) {
    return res.status(404).json({ error: "Game not found" });
  }

  const highestScore = await HighScore.findOne({
    where: { gameId, score: { $gt: score } },
  });

  if (highestScore && highestScore.score > score) {
    return res.status(400).json({ error: "Score not high enough" });
  }

  try {
    const newScore = new HighScore({ gameId, player_name, score });
    await newScore.save();

    res.json({ message: "High score added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`High score server running on http://localhost:${port}`);
});
