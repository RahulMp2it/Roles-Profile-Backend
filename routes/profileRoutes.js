import express from 'express';
import ProfileController from '../Controllers/ProfileController.js';

const profileRouter = express.Router();

// Create a profile
profileRouter.post('/', ProfileController.createProfile);

// Get all profiles
profileRouter.get('/', ProfileController.getAllProfiles);

// Get a single profile by ID
profileRouter.get('/:id', ProfileController.getProfile);

// Update a profile by ID
profileRouter.put('/:id', ProfileController.updateProfile);

// Delete a profile by ID
profileRouter.delete('/:id', ProfileController.deleteProfile);

profileRouter.get('/department/:departmentId', ProfileController.getProfilesByDepartment);


export default profileRouter;
