import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fileRoutes from "./routes/file.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/files", fileRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

export default app;
