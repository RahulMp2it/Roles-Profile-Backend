import express from "express";

import {
  createBehaviour,
  getAllBehaviours,
  getBehaviourByProfileId,
  updateBehaviour,
  deleteBehaviour
} from "../Controllers/BehaviourCOntroller.js";

const behaviourRouter = express.Router();

behaviourRouter.post("/", createBehaviour);
behaviourRouter.get("/", getAllBehaviours);
behaviourRouter.get("/:profileId", getBehaviourByProfileId);
behaviourRouter.put("/:id", updateBehaviour);
behaviourRouter.delete("/:id", deleteBehaviour);

export default behaviourRouter;
