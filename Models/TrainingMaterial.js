import mongoose from 'mongoose';

const trainingMaterialSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  fileType: { type: String, required: true, enum: ['pdf', 'mp4', 'word'] },
  filePath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const TrainingMaterialModel = mongoose.model('TrainingMaterial', trainingMaterialSchema);

export default TrainingMaterialModel;