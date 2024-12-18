import ProfileModel from "../Models/Profile.js";
import Designation from "../Models/Designation.js"
import Department from "../Models/Department.js"

class ProfileController {

  // Create profile
  static createProfile = async (req, res) => {
    const { Profile, designation, department } = req.body;

    if (Profile && designation && department) {
      try {
        // provided designation and department exist or not 
        const foundDesignation = await Designation.findById(designation);
        const foundDepartment = await Department.findById(department);

        if (!foundDesignation || !foundDepartment) {
          return res.status(404).send({
            status: "failed",
            message: "Invalid designation or department provided"
          });
        }

        const profile = new ProfileModel({
          Profile,
          designation: foundDesignation._id, // Reference ObjectId
          department: foundDepartment._id,   // Reference ObjectId
        });

        // Save profile to database
        await profile.save();

        return res.status(201).send({
          status: "success",
          message: "Profile added successfully",
          data: profile,
        });

      } catch (error) {
        console.error(error);
        res.status(500).send({
          status: "failed",
          message: "Failed to add profile",
        });
      }
    } else {
      res.status(400).send({
        status: "failed",
        message: "All fields are required",
      });
    }
  }

// Get profile by ID
static getProfileById = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await ProfileModel.findById(id)
      .populate('department', 'departmentName') // Populate departmentName
      .populate('designation', 'designationName'); // Populate designationName
      
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json({
      profileName: profile.name,
      department: profile.department ? profile.department.departmentName : null,
      designation: profile.designation ? profile.designation.designationName : null,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  // Get profiles by department ID
  static getProfilesByDepartment = async (req, res) => {
    const { departmentId } = req.params;
    // console.log(departmentId);
    try {
      const profiles = await ProfileModel.find({ department: departmentId });
      if (profiles.length > 0) {
        res.status(200).send({
          status: "success",
          data: profiles,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "No profiles found for this department",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Error fetching profiles by department",
      });
    }
  };

  // Get profiles by designation ID
  static getProfilesByDesignation = async (req, res) => {
    const { designationId } = req.params;

    try {
      const profiles = await ProfileModel.find({ designation: designationId });
      if (profiles.length > 0) {
        res.status(200).send({
          status: "success",
          data: profiles,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "No profiles found for this designation",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "failed",
        message: "Error fetching profiles by designation",
      });
    }
  };

  // Get designations by department ID
  static getDesignationsByDepartment = async (req, res) => {
    const { departmentId } = req.params;

    try {
      // Find designations matching the department ID
      const designations = await Designation.find({ department: departmentId });

      if (designations.length > 0) {
        res.status(200).send({
          status: "success",
          data: designations,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "No designations found for this department",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to fetch designations by department ID",
      });
    }
  };


  // Get details of a single profile by ID (populate department and designation)
  static getProfile = async (req, res) => {
    try {
      const profile = await ProfileModel.findById(req.params.id)
        .populate("designation", "designationName") // Populate designation details
        .populate("department", "DepartmentName");  // Populate department details

      if (profile) {
        res.status(200).send({
          status: "success",
          data: profile,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "Profile not found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to fetch profile data",
      });
    }
  }

  // Get all profiles with populated fields
  static getAllProfiles = async (req, res) => {
    try {
      const profiles = await ProfileModel.find().populate("designation").populate("department");

      res.status(200).send({
        status: "success123",
        data: profiles,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to fetch profiles",
      });
    }
  }

  // Update profile details
  static updateProfile = async (req, res) => {
    const { Profile, designation, department } = req.body;

    try {
      const profile = await ProfileModel.findById(req.params.id);
      if (profile) {
        // Validate the provided designation and department (if provided)
        if (designation) {
          const foundDesignation = await Designation.findById(designation);
          if (!foundDesignation) {
            return res.status(404).send({
              status: "failed",
              message: "Invalid designation provided",
            });
          }
          profile.designation = designation; // Update designation
        }

        if (department) {
          const foundDepartment = await Department.findById(department);
          if (!foundDepartment) {
            return res.status(404).send({
              status: "failed",
              message: "Invalid department provided",
            });
          }
          profile.department = department; // Update department
        }

        // Update profile fields
        profile.Profile = Profile || profile.Profile;

        await profile.save();
        res.status(200).send({
          status: "success",
          message: "Profile updated successfully",
          data: profile,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "Profile not found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to update profile",
      });
    }
  }

  // Delete a profile
  static deleteProfile = async (req, res) => {
    try {
      const profile = await ProfileModel.findById(req.params.id);
      if (profile) {
        await profile.deleteOne();
        res.status(200).send({
          status: "success",
          message: "Profile deleted successfully",
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "Profile not found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to delete profile",
      });
    }
  }
}

export default ProfileController;
