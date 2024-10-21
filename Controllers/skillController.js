import Skill from "../Models/Skill.js";

// Create a new skill
export const createSkill = async (req, res) => {
  try {
    const { skill, profileId } = req.body;

    // Check if skill already exists
    const existingSkill = await Skill.findOne({ skill });
    if (existingSkill) {
      return res.status(400).json({ message: "Skill already exists." });
    }

    // Create new skill
    const newSkill = new Skill({ skill, profile: profileId });
    await newSkill.save();

    res.status(201).json({ message: "Skill created successfully.", skill: newSkill });
  } catch (error) {
    res.status(500).json({ message: "Error creating skill.", error: error.message });
  }
};

// Get all skills
export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skills.", error: error.message });
  }
};

// Get skill by ID
export const getSkillById = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    res.status(200).json(skill);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skill.", error: error.message });
  }
};

// Update a skill
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skill } = req.body;

    const updatedSkill = await Skill.findByIdAndUpdate(id, { skill }, { new: true });

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
    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    res.status(200).json({ message: "Skill deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill.", error: error.message });
  }
};
