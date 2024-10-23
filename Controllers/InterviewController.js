import Interview from "../Models/Interview.js";

// Create a new interview
export const createInterview = async (req, res) => {
  try {
    const { interview, profileId } = req.body;

    // Check if interview already exists
    const existingInterview = await Interview.findOne({ interview });
    if (existingInterview) {
      return res.status(400).json({ message: "Interview already exists." });
    }

    // Create new interview
    const newInterview = new Interview({ interview, profile: profileId });
    await newInterview.save();

    res.status(201).json({ message: "Interview created successfully.", interview: newInterview });
  } catch (error) {
    res.status(500).json({ message: "Error creating interview.", error: error.message });
  }
};

// Get all interviews
export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({});
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

    if (!interviews) {
      return res.status(404).json({ message: "Interviews not found." });
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
    const { interview } = req.body;

    const updatedInterview = await Interview.findByIdAndUpdate(id, { interview }, { new: true });

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
