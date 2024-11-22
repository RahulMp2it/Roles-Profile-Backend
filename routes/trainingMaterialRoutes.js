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

// POST /api/training-materials - Create a new training material
trainingRouter.post('/', upload.single("document"), createTrainingMaterial);

// GET /api/training-materials - Get all training materials
trainingRouter.get('/', getAllTrainingMaterials);

// GET /api/training-materials/:id - Get a training material by ID
trainingRouter.get('/:id', getTrainingMaterialById);

// PUT /api/training-materials/:id - Update a training material by ID
trainingRouter.put('/:id', updateTrainingMaterial);

// DELETE /api/training-materials/:id - Delete a training material by ID
trainingRouter.delete('/:id', deleteTrainingMaterial);

export default trainingRouter;
