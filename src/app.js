import express from 'express'
import apiRouter from './routes/api.js';
import authMiddleware from './middlewares/auth.js'

const app = express()
app.use(authMiddleware)
app.use(express.json())
app.use('/', apiRouter)

module.exports = app;