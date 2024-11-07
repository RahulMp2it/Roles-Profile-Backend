import mongoose, { Model, Types } from "mongoose";

//Defining Schema
const departmentSchema = new mongoose.Schema({
  DepartmentName: { type: String, required: true, trim: true },
})

// model
const departmentModel = mongoose.model("Department", departmentSchema)

export default departmentModel