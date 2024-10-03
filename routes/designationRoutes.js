import express from 'express';
import DesignationController from '../Controllers/DesignationController.js';

const designationRouter = express.Router();

designationRouter.post('/', DesignationController.createDesignation);
designationRouter.get('/designation/:id', DesignationController.getDesignation);
designationRouter.get('/', DesignationController.getAllDesignations);
designationRouter.put('/:id', DesignationController.updateDesignation);
designationRouter.delete('/:id', DesignationController.deleteDesignation);

export default designationRouter;
