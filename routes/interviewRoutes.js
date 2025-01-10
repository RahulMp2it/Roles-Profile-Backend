import express from "express";
import {
  addOrUpdateStage,
  getAllInterviews,
  getInterviewByProfileId,
  updateInterview,
  deleteInterview
} from "../Controllers/InterviewController.js";

const interviewRouter = express.Router();

// Route to add a stage or create a new interview
interviewRouter.post('/stage/:profileId', addOrUpdateStage);
interviewRouter.get("/", getAllInterviews);
interviewRouter.get("/:profileId", getInterviewByProfileId);
interviewRouter.put("/:id", updateInterview);
interviewRouter.delete("/:id", deleteInterview);

export default interviewRouter;
