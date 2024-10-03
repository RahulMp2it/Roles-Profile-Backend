import mongoose, { Model, Types } from "mongoose";

//Defining Schema
const profileSchema = new mongoose.Schema({
  Profile: {type: String, required: true, trim: true},
  designation: {type: String, required: true, trim: true},
  Department: {type: String, required: true, trim: true},
})

// model
const ProfileModel = mongoose.model("Profile", profileSchema)

export default ProfileModel