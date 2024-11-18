import express from 'express';
import DesignationController from '../Controllers/DesignationController.js';

const designationRouter = express.Router();

designationRouter.post('/', DesignationController.createDesignation);
designationRouter.get('/:id', DesignationController.getDesignation);
designationRouter.get('/', DesignationController.getAllDesignations);
designationRouter.put('/:id', DesignationController.updateDesignation);
designationRouter.delete('/:id', DesignationController.deleteDesignation);

designationRouter.get('/department/:departmentId', DesignationController.getDesignationsByDepartment);
designationRouter.get('/:designationId/department', DesignationController.getDepartmentByDesignationId);


export default designationRouter;
