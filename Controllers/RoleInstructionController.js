import roleInstructioModel from "../Models/RoleInstruction.js";

// Create a new instruction
export const createRoleInstruction = async (req, res) => {
  
    const { roleInstructions, roleId } = req.body;

    // Validate request
  if (!Array.isArray(roleInstructions) || roleInstructions.length === 0) {
    return res.status(400).json({ message: "Role instructions must be a non-empty array." });
  }
  if (!roleId) {
    return res.status(400).json({ message: "Role ID is required." });
  }

    try {
    // Prepare RoleInstruction documents
    const roleInstructionDocs = roleInstructions.map((instruction) => ({
      roleInstruction: instruction,
      role: roleId,
    }));

    // Insert RoleInstructions in bulk
    const createdRoleInstructions = await roleInstructioModel.insertMany(roleInstructionDocs);
    res.status(201).json({
      message: "Role instructions created successfully.",
      roleInstructions: createdRoleInstructions,
    });
  } catch (error) {
    console.error("Error creating role instructions:", error);
    res.status(500).json({ message: "Error creating role instructions.", error });
  }
};

// Get all instructions
export const getAllRoleInstructions = async (req, res) => {
  try {
    const instructions = await roleInstructioModel.find({});
    res.status(200).json(instructions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching instructions.", error: error.message });
  }
};

// Get instructions by role ID
export const getInstructionsByRoleId = async (req, res) => {
  try {
    const { roleId } = req.params;
    const instructions = await roleInstructioModel.find({ role: roleId });

    if (!instructions || instructions.length === 0) {
      return res.status(404).json({ message: "No instructions found for this role." });
    }

    res.status(200).json(instructions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching instructions.", error: error.message });
  }
};

// Update an instruction
export const updateRoleInstruction = async (req, res) => {
  try {
    const { id } = req.params;
    const { roleInstruction } = req.body;

    const updatedInstruction = await roleInstructioModel.findByIdAndUpdate(id, { roleInstruction }, { new: true });

    if (!updatedInstruction) {
      return res.status(404).json({ message: "Instruction not found." });
    }

    res.status(200).json({ message: "Instruction updated successfully.", instruction: updatedInstruction });
  } catch (error) {
    res.status(500).json({ message: "Error updating instruction.", error: error.message });
  }
};

// Delete an instruction
export const deleteRoleInstruction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInstruction = await roleInstructioModel.findByIdAndDelete(id);

    if (!deletedInstruction) {
      return res.status(404).json({ message: "Instruction not found." });
    }

    res.status(200).json({ message: "Instruction deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting instruction.", error: error.message });
  }
};
