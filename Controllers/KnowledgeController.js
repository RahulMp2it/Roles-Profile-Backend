import Knowledge from "../Models/Knowledge.js";

// Create a new knowledge entry
export const createKnowledge = async (req, res) => {
  try {
    const { knowledge, profileId } = req.body;

    // Check if the knowledge already exists for the same profile
    const existingKnowledge = await Knowledge.findOne({ knowledge, profile: profileId });
    if (existingKnowledge) {
      return res.status(400).json({ message: "Knowledge already exists for this profile." });
    }

    // Create new knowledge entry
    const newKnowledge = new Knowledge({ knowledge, profile: profileId });
    await newKnowledge.save();

    res.status(201).json({ message: "Knowledge created successfully.", knowledge: newKnowledge });
  } catch (error) {
    res.status(500).json({ message: "Error creating knowledge.", error: error.message });
  }
};

// Get all knowledge entries
export const getAllKnowledge = async (req, res) => {
  try {
    const knowledgeEntries = await Knowledge.find({});
    res.status(200).json(knowledgeEntries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching knowledge entries.", error: error.message });
  }
};

// Get knowledge by profile ID
export const getKnowledgeByProfileId = async (req, res) => {
  try {
    const { profileId } = req.params;
    const knowledgeEntries = await Knowledge.find({ profile: profileId });

    if (!knowledgeEntries || knowledgeEntries.length === 0) {
      return res.status(404).json({ message: "No knowledge entries found for this profile." });
    }

    res.status(200).json(knowledgeEntries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching knowledge entries.", error: error.message });
  }
};

// Update a knowledge entry
export const updateKnowledge = async (req, res) => {
  try {
    const { id } = req.params;
    const { knowledge } = req.body;

    const updatedKnowledge = await Knowledge.findByIdAndUpdate(id, { knowledge }, { new: true });

    if (!updatedKnowledge) {
      return res.status(404).json({ message: "Knowledge entry not found." });
    }

    res.status(200).json({ message: "Knowledge updated successfully.", knowledge: updatedKnowledge });
  } catch (error) {
    res.status(500).json({ message: "Error updating knowledge.", error: error.message });
  }
};

// Delete a knowledge entry
export const deleteKnowledge = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedKnowledge = await Knowledge.findByIdAndDelete(id);

    if (!deletedKnowledge) {
      return res.status(404).json({ message: "Knowledge entry not found." });
    }

    res.status(200).json({ message: "Knowledge deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting knowledge.", error: error.message });
  }
};
