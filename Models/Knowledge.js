import mongoose from "mongoose";

// Defining Schema
const knowledgeSchema = mongoose.Schema({
  knowledge: { type: String, required: true, trim: true },

  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    //required:true
  }
})

const knowledgeModal = mongoose.model("Knowledge", knowledgeSchema);

export default knowledgeModal;