import ProfileModel from "../Models/Profile.js";

class ProfileController {
  
  // Create profile
  static createProfile = async (req, res) => {
    const { Profile, designation, Department } = req.body;
    
    if (Profile && designation && Department) {
      try {
        const profile = new ProfileModel({
          Profile,
          designation,
          Department,
        });
        
        // Save profile to database
        await profile.save();
        res.status(201).send({
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

  // Get details of a single profile by ID
  static getProfile = async (req, res) => {
    try {
      const profile = await ProfileModel.findById(req.params.id);
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

  // Get all profiles
  static getAllProfiles = async (req, res) => {
    try {
      const profiles = await ProfileModel.find();
      res.status(200).send({
        status: "success",
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
    const { Profile, designation, Department } = req.body;
    
    try {
      const profile = await ProfileModel.findById(req.params.id);
      if (profile) {
        // Update profile fields
        profile.Profile = Profile || profile.Profile;
        profile.designation = designation || profile.designation;
        profile.Department = Department || profile.Department;
        
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
