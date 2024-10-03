import mongoose from "mongoose";

// Defining Schema
const designationSchema = new mongoose.Schema({
  DesignationName: {type: String, required: true, trime: true},
  DepartmentName: {type: String, required: true, trime: true},
});

//model

const DesignationModel = mongoose.model("designation", designationSchema)

export default DesignationModel;

