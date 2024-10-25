import RoleTask from "../Models/RoleTask.js";
import Role from "../Models/Role.js";

// Create a new task
export const createRoleTask = async (req, res) => {
  try {
    const { roleTask, roleId } = req.body;

    // Check if task already exists for the role
    const existingTask = await RoleTask.findOne({ roleTask, role: roleId });
    if (existingTask) {
      return res.status(400).json({ error: "Task already exists for this role." });
    }

    // Check if the role exists
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ error: "Role not found." });
    }

    // Create new role task
    const newRoleTask = new RoleTask({ roleTask, role: roleId });
    await newRoleTask.save();

    res.status(201).json({ message: "Task created successfully.", task: newRoleTask });
  } catch (error) {
    res.status(500).json({ message: "Error creating task.", error: error.message });
  }
};

// Get all tasks
export const getAllRoleTasks = async (req, res) => {
  try {
    const tasks = await RoleTask.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks.", error: error.message });
  }
};

// Get tasks by role ID
export const getTasksByRoleId = async (req, res) => {
  try {
    const { roleId } = req.params;
    const tasks = await RoleTask.find({ role: roleId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this role." });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks.", error: error.message });
  }
};

// Update a task
export const updateRoleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleTask } = req.body;

    const updatedTask = await RoleTask.findByIdAndUpdate(id, { roleTask }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task updated successfully.", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task.", error: error.message });
  }
};

// Delete a task
export const deleteRoleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await RoleTask.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task.", error: error.message });
  }
};