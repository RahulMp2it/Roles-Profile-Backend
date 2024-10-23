import express from "express";
import {
  createKnowledge,
  getAllKnowledge,
  getKnowledgeByProfileId,
  updateKnowledge,
  deleteKnowledge
} from "../Controllers/KnowledgeController.js";

const knowledgeRouter = express.Router();

knowledgeRouter.post("/", createKnowledge);
knowledgeRouter.get("/", getAllKnowledge);
knowledgeRouter.get("/:profileId", getKnowledgeByProfileId);
knowledgeRouter.put("/:id", updateKnowledge);
knowledgeRouter.delete("/:id", deleteKnowledge);

export default knowledgeRouter;
