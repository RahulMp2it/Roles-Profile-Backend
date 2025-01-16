import express from "express";
import {
  addOrUpdateStage,
  getAllInterviews,
  getInterviewByProfileId,
  editStage,
  deleteStage
} from "../Controllers/InterviewController.js";

const interviewRouter = express.Router();

// Route to add a stage or create a new interview
interviewRouter.post('/stage/:profileId', addOrUpdateStage);
interviewRouter.get("/", getAllInterviews);
interviewRouter.get("/:profileId", getInterviewByProfileId);
interviewRouter.put("/stage/:interviewId/:stageId", editStage);
interviewRouter.delete("/stage/:interviewId/:stageId", deleteStage);

export default interviewRouter;
