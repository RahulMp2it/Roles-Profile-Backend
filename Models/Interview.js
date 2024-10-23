import mongoose from "mongoose";

// Defining Schema
const interviewSchema = mongoose.Schema({
  interview: { type: String, required: true, trim: true },

  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    //required:true
  }
})

const iterviewModal = mongoose.model("Interview", interviewSchema);

export default iterviewModal;