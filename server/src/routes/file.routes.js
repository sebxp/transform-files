import express from 'express'
import { getFiles, getFilesList } from '../controllers/file.controller.js'

const router = express.Router()

// Endpoint to get all files: /files/data
router.get('/data', getFiles)
router.get('/list', getFilesList)

export default router
