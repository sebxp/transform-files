import express from "express";
import { getFilesData } from "../controllers/file.controller.js";

const router = express.Router();

// Endpoint to get all files: /files/data
router.get("/data", getFilesData);

export default router;
