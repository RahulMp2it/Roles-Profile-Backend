import express from 'express';
import EmployeeController from '../Controllers/EmployeeController.js'; 
const router = express.Router();

// Route to add an employee
router.post('/', EmployeeController.createEmployee);

// Route to get all employees
router.get('/', EmployeeController.getAllEmployees);

// Route to get a specific employee by ID
router.get('/:id', EmployeeController.getEmployee);

// Route to update an employee by ID
router.put('/:id', EmployeeController.updateEmployee);

// Route to delete an employee by ID
router.delete('/:id', EmployeeController.deleteEmployee);

export default router;
