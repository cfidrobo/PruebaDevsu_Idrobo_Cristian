import sequelize from './shared/database/database.js'
import { usersRouter } from "./users/router.js"
import express from 'express'

const app = express()
const PORT = 8000

sequelize.sync({ force: true }).then(() => {
       if (process.env.NODE_ENV !== 'test') {
         console.log('db is ready')
       }
     })

app.use(express.json())
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})
app.use('/api/users', usersRouter)

const server = app.listen(PORT, () => {
    console.log('Server running on port PORT', PORT)
})

export { app, server }