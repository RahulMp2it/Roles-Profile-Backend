import express from "express";

import { createRole, getAllRoles, getRoleByProfileId, updateRole, deleteRole } from "../Controllers/RoleController.js";

const roleRouter = express.Router();

roleRouter.post("/", createRole);
roleRouter.get("/", getAllRoles);
roleRouter.get("/:profileId", getRoleByProfileId);
roleRouter.put("/:id", updateRole);
roleRouter.delete("/:id", deleteRole);

export default roleRouter;
