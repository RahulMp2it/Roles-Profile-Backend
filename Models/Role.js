import mongoose from "mongoose";

//Defining Schema
const roleSchema = new mongoose.Schema({
  role: { type: String, required: true, trim: true },

  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required:true
  }
})

// model
const roleModel = mongoose.model("Role", roleSchema)

export default roleModel;