import express from 'express'
import apiRouter from './routes/api';
import authMiddleware from './middlewares/auth'
import adminMiddleware from './middlewares/admin'

const app = express()
app.use(authMiddleware)
// app.use(/movie/, adminMiddleware)
app.use(express.json())
app.use('/', apiRouter)

module.exports = app;