import roleModel from "../Models/Role.js";
// import Role from "../Models/Role.js";

// Create a new role
export const createRole = async (req, res) => {
    const { roles, profileId } = req.body;

    console.log('profileId',profileId);
    

    if (!Array.isArray(roles) || roles.length === 0) {
      return res.status(400).json({ message: "Roles must be a non-empty array." });
    }
    try {
      // Map roles to the schema structure
      const roleDocs = roles.map((role) => ({ role, profile: profileId }));
  
      // Insert all roles at once
      const createdRoles = await roleModel.insertMany(roleDocs);
  
      res.status(201).json({
        message: "Roles created successfully.",
        roles: createdRoles,
      });
    } catch (error) {
      console.error("Error creating roles:", error);
      res.status(500).json({ message: "Error creating roles.", error });
    }
};

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await roleModel.find({});
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching roles.", error: error.message });
  }
};

// Get role by profile ID (data will show according to the profile id)
export const getRoleByProfileId = async (req, res) => {
  try {
    const { profileId } = req.params;
    const roles = await roleModel.find({ profile: profileId });

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

    const updatedRole = await roleModel.findByIdAndUpdate(id, { role }, { new: true });

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
    const deletedRole = await roleModel.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found." });
    }

    res.status(200).json({ message: "Role deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting role.", error: error.message });
  }
};
