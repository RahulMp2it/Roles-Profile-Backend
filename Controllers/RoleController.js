import Role from "../Models/Role.js";

// Create a new role
export const createRole = async (req, res) => {
  try {
    const { role, profileId } = req.body;

    // Check if role already exists
    const existingRole = await Role.findOne({ role });
    if (existingRole) {
      return res.status(400).json({ message: "Role already exists." });
    }

    // Create new role
    const newRole = new Role({ role, profile: profileId });
    await newRole.save();

    res.status(201).json({ message: "Role created successfully.", role: newRole });
  } catch (error) {
    res.status(500).json({ message: "Error creating role.", error: error.message });
  }
};

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles.", error: error.message });
  }
};

// Get role by profile ID (data will show according to the profile id)
export const getRoleByProfileId = async (req, res) => {
  try {
    const { profileId } = req.params;
    const roles = await Role.find({ profile: profileId });

    if (!roles) {
      return res.status(404).json({ message: "Roles not found." });
    }

    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles.", error: error.message });
  }
};

// Update a role
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(id, { role }, { new: true });

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found." });
    }

    res.status(200).json({ message: "Role updated successfully.", role: updatedRole });
  } catch (error) {
    res.status(500).json({ message: "Error updating role.", error: error.message });
  }
};

// Delete a role
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found." });
    }

    res.status(200).json({ message: "Role deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting role.", error: error.message });
  }
};
