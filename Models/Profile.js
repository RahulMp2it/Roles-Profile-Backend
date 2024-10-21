import mongoose, { Model, Types } from "mongoose";

//Defining Schema
const profileSchema = new mongoose.Schema({
  Profile: {
    type: String, required: true, trim: true,
    match: [/^[a-zA-Z\s]+$/, 'numbers are not allowed.']
  },
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Designation",
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  }
})

// model
const ProfileModel = mongoose.model("Profile", profileSchema)

export default ProfileModel