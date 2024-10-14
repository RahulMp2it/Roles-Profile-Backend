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
