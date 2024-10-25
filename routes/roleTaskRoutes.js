import express from "express";
import {
  createRoleTask,
  getAllRoleTasks,
  getTasksByRoleId,
  updateRoleTask,
  deleteRoleTask
} from "../Controllers/RoleTaskController.js";

const roleTaskRouter = express.Router();

roleTaskRouter.post("/", createRoleTask);
roleTaskRouter.get("/", getAllRoleTasks);
roleTaskRouter.get("/:roleId", getTasksByRoleId);
roleTaskRouter.put("/:id", updateRoleTask);
roleTaskRouter.delete("/:id", deleteRoleTask);

export default roleTaskRouter;
