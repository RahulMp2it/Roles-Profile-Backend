import mongoose, { Model, Types } from "mongoose";

//Defining Schema
const employeeSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  profile: {type: String, required: true, trim: true},
  department: {type: String, required: true, trim: true},
  designation: {type: String, required: true, trim: true},
 
})

// model
const EmployeeModel = mongoose.model("Employee", employeeSchema)

export default EmployeeModel