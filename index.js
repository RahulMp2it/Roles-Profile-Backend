import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectDB.js'
import userRoutes from './routes/userRoutes.js'
import router from './routes/employeeRoutes.js'
import departRouter from './routes/departmentRoutes.js'
import designationRouter from './routes/designationRoutes.js'
import profileRouter from './routes/profileRoutes.js'
import skillRouter from './routes/skillRoutes.js'
import roleRouter from './routes/roleRoutes.js'
import interviewRouter from './routes/interviewRoutes.js'
import knowledgeRouter from './routes/knowledgeRoutes.js'
import behaviourRouter from './routes/behaviourRoutes.js'
import roleTaskRouter from './routes/roleTaskRoutes.js'
import instructionRouter from './routes/roleInstructionRoutes.js'
import trainingRouter from './routes/trainingMaterialRoutes.js'

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
app.use('/api/department', departRouter);
app.use('/api/designation', designationRouter);
app.use('/api/profile', profileRouter);
app.use('/api/skill', skillRouter);
app.use('/api/role', roleRouter);
app.use('/api/interview', interviewRouter)
app.use('/api/knowledge', knowledgeRouter)
app.use('/api/behaviour', behaviourRouter)
app.use('/api/task', roleTaskRouter)
app.use('/api/instruction', instructionRouter)
app.use('/api/training', trainingRouter)

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})

