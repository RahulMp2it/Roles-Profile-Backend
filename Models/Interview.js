import mongoose from "mongoose";

// Defining Schema
const interviewSchema = mongoose.Schema({
  stages: [
    {
      stage: { type: String, required: true },
      time: { type: Number, required: true }, // Time in minutes
    },
  ],
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required:true
  }
})

const iterviewModal = mongoose.model("Interview", interviewSchema);

export default iterviewModal;