import mongoose, { Model, Types } from "mongoose";

//Defining Schema
const userSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
  password: {type: String, required: true, trim: true},
})

// model
const UserModel = mongoose.model("user", userSchema)

export default UserModel