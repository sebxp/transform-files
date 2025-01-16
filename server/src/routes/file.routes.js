/**
 * @fileoverview Routes for file-related operations.
 * @module routes/file.routes
 */

import express from "express";
import { getFiles, getFilesList } from "../controllers/file.controller.js";

const router = express.Router();

/**
 * Route to get file data.
 * @name files/data
 * @function
 * @memberof module:routes/file.routes
 * @inner
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.get("/data", getFiles);

/**
 * Route to get list of files.
 * @name files/list
 * @function
 * @memberof module:routes/file.routes
 * @inner
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
router.get("/list", getFilesList);

export default router;
