import express from 'express';
import {
  createTrainingMaterial,
  getAllTrainingMaterials,
  getTrainingMaterialById,
  updateTrainingMaterial,
  deleteTrainingMaterial,
} from '../Controllers/TrainingMaterialController.js';
import upload from "../middlewares/multerConfig.js"

const trainingRouter = express.Router();

// Create a new training material
trainingRouter.post('/', upload.single("document"), createTrainingMaterial);

// Get all training materials
trainingRouter.get('/', getAllTrainingMaterials);

// Get a training material by ID
trainingRouter.get('/:id', getTrainingMaterialById);

// Update a training material by ID
trainingRouter.put('/:id', updateTrainingMaterial);

// Delete a training material by ID
trainingRouter.delete('/:id', deleteTrainingMaterial);

export default trainingRouter;
