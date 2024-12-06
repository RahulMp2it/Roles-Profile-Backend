import mongoose from "mongoose";

const StageSchema = new mongoose.Schema(
  {
    stage: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

// Defining Schema
const interviewSchema = mongoose.Schema({
  stages: [StageSchema], // Array of objects with stage and time
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required:true
  }
}) 

const iterviewModal = mongoose.model("Interview", interviewSchema);

export default iterviewModal;