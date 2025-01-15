import express from 'express'
import fileRoutes from './routes/file.routes.js'

const app = express()

// Middlewares
app.use(express.json())

// Routes
app.use('/files', fileRoutes)

export default app
