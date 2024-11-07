import mongoose from "mongoose";

// Defining Schema
const designationSchema = new mongoose.Schema({
  DesignationName: { type: String, required: true, trime: true },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },

});



//model
const DesignationModel = mongoose.model("Designation", designationSchema)

export default DesignationModel;

