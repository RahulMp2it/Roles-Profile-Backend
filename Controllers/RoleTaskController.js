import roleTaskModel from "../Models/RoleTask.js";


// Create a new task
export const createRoleTask = async (req, res) => {

  const { roleTasks, roleId } = req.body;

  // Validate request
  if (!Array.isArray(roleTasks) || roleTasks.length === 0) {
    return res.status(400).json({ message: "Role tasks must be a non-empty array." });
  }
  if (!roleId) {
    return res.status(400).json({ message: "Role ID is required." });
  }
  try {
    // Prepare RoleTask documents
    const roleTaskDocs = roleTasks.map((task) => ({
      roleTask: task,
      role: roleId,
    }));

    // Insert RoleTasks in bulk
    const createdRoleTasks = await roleTaskModel.insertMany(roleTaskDocs);
    res.status(201).json({ message: "Role tasks created successfully.", roleTasks: createdRoleTasks });
  } catch (error) {
    console.error("Error creating role tasks:", error);
    res.status(500).json({ message: "Error creating role tasks.", error });
  }
};

// Get all tasks
export const getAllRoleTasks = async (req, res) => {
  try {
    const tasks = await roleTaskModel.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks.", error: error.message });
  }
};

// Get tasks by role ID
export const getTasksByRoleId = async (req, res) => {
  try {
    const { roleId } = req.params;
    const tasks = await roleTaskModel.find({ role: roleId });

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

    const updatedTask = await roleTaskModel.findByIdAndUpdate(id, { roleTask }, { new: true });

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
    const deletedTask = await roleTaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task.", error: error.message });
  }
};
