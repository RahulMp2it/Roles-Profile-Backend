import express from 'express';

import {
  createSkill,
  getAllSkills,
  getSkillByProfileId,
  updateSkill,
  deleteSkill
} from '../Controllers/skillController.js';

const skillRouter = express.Router();

// POST /api/skills - Create a new skill
skillRouter.post('/', createSkill);

// GET /api/skills - Get all skills
skillRouter.get('/', getAllSkills);

// GET /api/skills/:id - Get a skill by ID
skillRouter.get('/:profileId', getSkillByProfileId);

// PUT /api/skills/:id - Update a skill by ID
skillRouter.put('/:id', updateSkill);

// DELETE /api/skills/:id - Delete a skill by ID
skillRouter.delete('/:id', deleteSkill);

export default skillRouter;