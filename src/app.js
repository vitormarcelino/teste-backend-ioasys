import express from 'express'
import apiRouter from './routes/api';
import authMiddleware from './middlewares/auth'

const app = express()
app.use(authMiddleware)
app.use(express.json())
app.use('/', apiRouter)

module.exports = app;