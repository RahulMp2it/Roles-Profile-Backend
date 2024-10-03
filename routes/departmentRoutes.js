import express from 'express';
import DepartmentController from '../Controllers/DepartmentController.js';

const departRouter = express.Router();

// Create a department
departRouter.post('/', DepartmentController.createDepartment);

// Get all departments
departRouter.get('/', DepartmentController.getAllDepartments);

// Get a single department by ID
departRouter.get('/:id', DepartmentController.getDepartment);

// Update a department by ID
departRouter.put('/:id', DepartmentController.updateDepartment);

// Delete a department by ID
departRouter.delete('/:id', DepartmentController.deleteDepartment);

export default departRouter;
