import Interview from "../Models/Interview.js";

// Create a new interview
export const createInterview = async (req, res) => {
  try {
    const { stages, profileId } = req.body; // Expecting an array of stages with time

    // Validation: Check if stages are provided
    if (!stages || stages.length === 0) {
      return res.status(400).json({ message: "Stages and time are required." });
    }

    // Create new interview
    const newInterview = new Interview({ stages, profile: profileId });
    await newInterview.save();

    res.status(201).json({ message: "Interview created successfully.", interview: newInterview });
  } catch (error) {
    res.status(500).json({ message: "Error creating interview.", error: error.message });
  }
};

// Get all interviews
export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({}).populate("profile", "name");
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching interviews.", error: error.message });
  }
};

// Get interview by profile ID
export const getInterviewByProfileId = async (req, res) => {
  try {
    const { profileId } = req.params;

    const interviews = await Interview.find({ profile: profileId });
    if (!interviews || interviews.length === 0) {
      return res.status(404).json({ message: "No interviews found for the given profile." });
    }

    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching interviews.", error: error.message });
  }
};

// Update an interview
export const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { stages } = req.body; // Expecting updated stages array

    if (!stages || stages.length === 0) {
      return res.status(400).json({ message: "Stages and time are required for update." });
    }

    const updatedInterview = await Interview.findByIdAndUpdate(
      id,
      { stages },
      { new: true }
    );

    if (!updatedInterview) {
      return res.status(404).json({ message: "Interview not found." });
    }

    res.status(200).json({ message: "Interview updated successfully.", interview: updatedInterview });
  } catch (error) {
    res.status(500).json({ message: "Error updating interview.", error: error.message });
  }
};

// Delete an interview
export const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInterview = await Interview.findByIdAndDelete(id);

    if (!deletedInterview) {
      return res.status(404).json({ message: "Interview not found." });
    }

    res.status(200).json({ message: "Interview deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting interview.", error: error.message });
  }
};
