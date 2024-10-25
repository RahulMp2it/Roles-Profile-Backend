import RoleInstruction from "../Models/RoleInstruction.js";
import Role from "../Models/Role.js";

// Create a new instruction
export const createRoleInstruction = async (req, res) => {
  try {
    const { roleInstruction, roleId } = req.body;

    // Check if instruction already exists for the role
    const existingInstruction = await RoleInstruction.findOne({ roleInstruction, role: roleId });
    if (existingInstruction) {
      return res.status(400).json({ error: "Instruction already exists for this role." });
    }

    // Check if the role exists
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ error: "Role not found." });
    }

    // Create new role instruction
    const newRoleInstruction = new RoleInstruction({ roleInstruction, role: roleId });
    await newRoleInstruction.save();

    res.status(201).json({ message: "Instruction created successfully.", instruction: newRoleInstruction });
  } catch (error) {
    res.status(500).json({ message: "Error creating instruction.", error: error.message });
  }
};

// Get all instructions
export const getAllRoleInstructions = async (req, res) => {
  try {
    const instructions = await RoleInstruction.find({});
    res.status(200).json(instructions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching instructions.", error: error.message });
  }
};

// Get instructions by role ID
export const getInstructionsByRoleId = async (req, res) => {
  try {
    const { roleId } = req.params;
    const instructions = await RoleInstruction.find({ role: roleId });

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

    const updatedInstruction = await RoleInstruction.findByIdAndUpdate(id, { roleInstruction }, { new: true });

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
    const deletedInstruction = await RoleInstruction.findByIdAndDelete(id);

    if (!deletedInstruction) {
      return res.status(404).json({ message: "Instruction not found." });
    }

    res.status(200).json({ message: "Instruction deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting instruction.", error: error.message });
  }
};
