import express from "express";
import { getFilesData, getFilesNames } from "../controllers/file.controller.js";

const router = express.Router();

// Endpoint to get all files: /files/data
router.get("/data", getFilesData);
router.get("/list", getFilesNames);

export default router;
