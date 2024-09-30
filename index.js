import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectDB.js'
import userRoutes from './routes/userRoutes.js'
import router from './routes/employeeRoutes.js'

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

//cors policy
app.use(cors())

//Database Connection
connectDB(DATABASE_URL)

//JSON
app.use(express.json())

// Load Routes
app.use("/api/user", userRoutes)
app.use('/api/employee', router); 


app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})

