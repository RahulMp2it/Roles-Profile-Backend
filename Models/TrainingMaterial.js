import mongoose from 'mongoose';

const trainingMaterialSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  fileType: { type: String, required: true, enum: ['pdf', 'mp4', 'word'] },
  filePath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  profileId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Profile', // Reference to the Profile model
    required: true 
  },
});

const TrainingMaterialModel = mongoose.model('TrainingMaterial', trainingMaterialSchema);

export default TrainingMaterialModel;