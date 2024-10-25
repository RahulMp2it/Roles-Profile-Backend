import express from "express";
import {
  createInterview,
  getAllInterviews,
  getInterviewByProfileId,
  updateInterview,
  deleteInterview
} from "../Controllers/InterviewController.js";

const interviewRouter = express.Router();

interviewRouter.post("/", createInterview);
interviewRouter.get("/", getAllInterviews);
interviewRouter.get("/:profileId", getInterviewByProfileId);
interviewRouter.put("/:id", updateInterview);
interviewRouter.delete("/:id", deleteInterview);

export default interviewRouter;