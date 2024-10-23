import mongoose from "mongoose";

// Defining Schema
const behaviourSchema = mongoose.Schema({
  behaviour: { type: String, required: true, trim: true },

  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    //required:true
  }
})

const behaviourModal = mongoose.model("Behaviour", behaviourSchema);

export default behaviourModal;