import Behaviour from "../Models/Behaviour.js";

// Create a new behaviour entry
export const createBehaviour = async (req, res) => {
  try {
    const { behaviour, profileId } = req.body;

    // Check if the behaviour already exists for the same profile
    const existingBehaviour = await Behaviour.findOne({ behaviour, profile: profileId });
    if (existingBehaviour) {
      return res.status(400).json({ message: "Behaviour already exists for this profile." });
    }

    // Create new behaviour entry
    const newBehaviour = new Behaviour({ behaviour, profile: profileId });
    await newBehaviour.save();

    res.status(201).json({ message: "Behaviour created successfully.", behaviour: newBehaviour });
  } catch (error) {
    res.status(500).json({ message: "Error creating behaviour.", error: error.message });
  }
};

// Get all behaviour entries
export const getAllBehaviours = async (req, res) => {
  try {
    const behaviours = await Behaviour.find({});
    res.status(200).json(behaviours);
  } catch (error) {
    res.status(500).json({ message: "Error fetching behaviours.", error: error.message });
  }
};

// Get behaviour by profile ID
export const getBehaviourByProfileId = async (req, res) => {
  try {
    const { profileId } = req.params;
    const behaviours = await Behaviour.find({ profile: profileId });

    if (!behaviours || behaviours.length === 0) {
      return res.status(404).json({ message: "No behaviours found for this profile." });
    }

    res.status(200).json(behaviours);
  } catch (error) {
    res.status(500).json({ message: "Error fetching behaviours.", error: error.message });
  }
};

// Update a behaviour entry
export const updateBehaviour = async (req, res) => {
  try {
    const { id } = req.params;
    const { behaviour } = req.body;

    const updatedBehaviour = await Behaviour.findByIdAndUpdate(id, { behaviour }, { new: true });

    if (!updatedBehaviour) {
      return res.status(404).json({ message: "Behaviour entry not found." });
    }

    res.status(200).json({ message: "Behaviour updated successfully.", behaviour: updatedBehaviour });
  } catch (error) {
    res.status(500).json({ message: "Error updating behaviour.", error: error.message });
  }
};

// Delete a behaviour entry
export const deleteBehaviour = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBehaviour = await Behaviour.findByIdAndDelete(id);

    if (!deletedBehaviour) {
      return res.status(404).json({ message: "Behaviour entry not found." });
    }

    res.status(200).json({ message: "Behaviour deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting behaviour.", error: error.message });
  }
};
