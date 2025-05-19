import express from "express";
import gamesRoutes from "./routes/gamesRoutes.js";
import dlcRoutes from "./routes/dlcRoutes.js";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {verifyToken} from "./middlewares/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("error al conectar con MongoDB", err));

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoutes);

app.use('/api/games', verifyToken, gamesRoutes);
app.use('/api/dlcs', verifyToken, dlcRoutes);

app.get("/games", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "games.html"));
});

app.get("/dlcs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dlcs.html"));
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));