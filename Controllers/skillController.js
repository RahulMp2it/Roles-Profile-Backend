import skillModel from "../Models/Skill.js";
// import Skill from "../Models/Skill.js";

// Create a new skill
export const createSkill = async (req, res) => {

    const { skills, profileId } = req.body;

   // Validate request
  if (!Array.isArray(skills) || skills.length === 0) {
    return res.status(400).json({ message: "Skills must be a non-empty array." });
  }
  if (!profileId) {
    return res.status(400).json({ message: "Profile ID is required." });
  }

  try {
    // Prepare skill documents
    const skillDocs = skills.map((skill) => ({
      skill: skill, // Skill name
      profile: profileId, // Associated profile ID
    }));

    // Insert skills in bulk
    const createdSkills = await skillModel.insertMany(skillDocs);

    res.status(201).json({
      message: "Skills created successfully.",
      skills: createdSkills,
    });
  } catch (error) {
    console.error("Error creating skills:", error);
    res.status(500).json({ message: "Error creating skills.", error });
  }
};

// Get all skills
export const getAllSkills = async (req, res) => {
  try {
    const skills = await skillModel.find({});
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skills.", error: error.message });
  }
};

// Get skill by ID(data will show according to the profile id)
export const getSkillByProfileId = async (req, res) => {
  try {
    const { profileId } = req.params;
    const skills = await skillModel.find({ profile: profileId });

    if (!skills) {
      return res.status(404).json({ message: "Skills not found." });
    }

    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skills.", error: error.message });
  }
};

// Update a skill
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill } = req.body;

    const updatedSkill = await skillModel.findByIdAndUpdate(id, { skill }, { new: true });

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    res.status(200).json({ message: "Skill updated successfully.", skill: updatedSkill });
  } catch (error) {
    res.status(500).json({ message: "Error updating skill.", error: error.message });
  }
};

// Delete a skill
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSkill = await skillModel.findByIdAndDelete(id);

    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    res.status(200).json({ message: "Skill deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill.", error: error.message });
  }
};
