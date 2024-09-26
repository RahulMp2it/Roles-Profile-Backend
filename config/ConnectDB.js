import mongoose from "mongoose";

const ConnectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "Roles"
    }
    await mongoose.connect(DATABASE_URL, DB_OPTIONS)
    console.log('Connected Successfully...')
  } catch (error) {
    console.log(error)
  }
} 
export default ConnectDB;