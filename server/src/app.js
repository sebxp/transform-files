/**
 * @fileoverview Main application file for the Express server.
 * @module app
 */

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

/**
 * Route serving file-related requests.
 * @name /files
 * @function
 * @memberof module:app
 * @inner
 */
app.use("/files", fileRoutes);

/**
 * Catch-all route to serve the main application.
 * @name *
 * @function
 * @memberof module:app
 * @inner
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

export default app;
