import express from 'express';
import multer from '../middlewares/multerConfig.js'; // Middleware for file validation
import {
  createTrainingMaterial,
  getAllTrainingMaterials,
  getTrainingMaterialsByProfile,
  deleteTrainingMaterial,
} from '../Controllers/TrainingMaterialController.js';

const trainingRouter = express.Router();

// Route to create a new training material
trainingRouter.post('/upload', multer.single('file'), createTrainingMaterial);

// Route to get all training materials
trainingRouter.get('/', getAllTrainingMaterials);

// Route to get training materials by profile ID
trainingRouter.get('/:profileId', getTrainingMaterialsByProfile);

// Route to delete a training material by ID
trainingRouter.delete('/:id', deleteTrainingMaterial);

export default trainingRouter;
