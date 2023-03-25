import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import autoCaption from "./features/auto-caption/index.js";
import getVideo from "./features/get-video/index.js";
import { handleError } from "./utils/middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true }));

app.use((req, res, next) => {
  handleError(express.json({ limit: "50mb" }), req, res, next);
});

app.get("/api", (_, res) => {
  res.sendStatus(400);
});

/// Uploads an image to IPFS using web3.storage
app.post("/api/auto-caption", async (req, res) => {
  await autoCaption(req, res);
});

/// Bookmarks an image with a tag
app.post("/api/get-video", async (req, res) => {
  await getVideo(req, res);
});

/// Gets a list of images linked to the tag
app.post("/api/query-scene", async (_req, res) => {
  res.sendStatus(400);
  // await queryScene(req, res);
});

/// Returns relevant server stats and logs.
app.get("/api/server-stats", (_, res) => {
  res.sendStatus(400);
});

app.listen(PORT, () => {
  console.log(`🔥 [server]: Server is running at https://localhost:${PORT}`);
});
