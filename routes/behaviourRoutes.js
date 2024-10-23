import express from "express";

import {
  createBehaviour,
  getAllBehaviours,
  getBehaviourByProfileId,
  updateBehaviour,
  deleteBehaviour
} from "../Controllers/BehaviourController.js";

const router = express.Router();

// Route to create a new behaviour entry
router.post("/", createBehaviour);

// Route to get all behaviour entries
router.get("/", getAllBehaviours);

// Route to get behaviour entries by profile ID
router.get("/profile/:profileId", getBehaviourByProfileId);

// Route to update a behaviour entry by ID
router.put("/:id", updateBehaviour);

// Route to delete a behaviour entry by ID
router.delete("/:id", deleteBehaviour);

export default router;
