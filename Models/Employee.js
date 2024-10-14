import mongoose, { Model, Types } from "mongoose";

//Defining Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'], // Regex for email validation
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'], // Regex for phone number validation
  },
  // department: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Department',  // Reference to the Department model
  //   required: true
  // },
})

// model
const EmployeeModel = mongoose.model("Employee", employeeSchema)

export default EmployeeModel