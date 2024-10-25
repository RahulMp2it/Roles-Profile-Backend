import express from 'express';
import {
  createRoleInstruction,
  getAllRoleInstructions,
  getInstructionsByRoleId,
  updateRoleInstruction,
  deleteRoleInstruction,
} from '../Controllers/RoleInstructionController.js';

const instructionRouter = express.Router();

instructionRouter.post('/', createRoleInstruction);

instructionRouter.get('/', getAllRoleInstructions);

instructionRouter.get('/:roleId', getInstructionsByRoleId);

instructionRouter.put('/:id', updateRoleInstruction);

instructionRouter.delete('/:id', deleteRoleInstruction);

export default instructionRouter;
