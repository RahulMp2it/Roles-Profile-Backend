import mongoose from 'mongoose';

const trainingMaterialSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['video', 'docx', 'pdf'],
  },
  link: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TrainingMaterialModel = mongoose.model('TrainingMaterial', trainingMaterialSchema);

export default TrainingMaterialModel;