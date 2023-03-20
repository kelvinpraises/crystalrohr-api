import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bookmarkImage from "./features/bookmark-image/index.js";
import getBookmarks from "./features/get-bookmarks/index.js";
import uploadImage from "./features/upload-image/index.js";
import { handleError } from "./utils/middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true }));

app.use((req, res, next) => {
  handleError(express.json({ limit: "50mb" }), req, res, next);
});

app.use("/", express.static("public"));

app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.get("/api", (_, res) => {
  res.sendStatus(400);
});

/// Uploads an image to IPFS using web3.storage
app.post("/api/upload-image", upload.single("image"), async (req, res) => {
  await uploadImage(req, res);
});

/// Bookmarks an image with a tag
app.post("/api/bookmark-image", async (req, res) => {
  await bookmarkImage(req, res);
});

/// Gets a list of images linked to the tag
app.post("/api/get-bookmarks", async (req, res) => {
  await getBookmarks(req, res);
});

/// Returns relevant server stats and logs.
app.get("/api/server-stats", (_, res) => {
  res.sendStatus(400);
});

app.listen(PORT, () => {
  console.log(`🔥 [server]: Server is running at https://localhost:${PORT}`);
});
