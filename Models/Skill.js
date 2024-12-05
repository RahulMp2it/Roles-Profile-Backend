import mongoose from "mongoose";

//Defining Schema
const skillSchema = new mongoose.Schema({
  skill: { type: String, required: true, trim: true },

  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
})

// model
const skillModel = mongoose.model("Skill", skillSchema)

export default skillModel;