import Interview from "../Models/Interview.js";

// Add a stage or create a new interview
export const addOrUpdateStage = async (req, res) => {
  const { profileId } = req.params; // Assume profileId comes from the route
  const { stage, time } = req.body; // Stage and time come from the request body
  
  try {
    // Check if an interview document exists for the given profileId
    let interview = await Interview.findOne({ profile: profileId });

    if (interview) {
      // If it exists, update the stages array by adding the new stage
      interview.stages.push({ stage, time });
      await interview.save();
      res.status(200).json({ message: 'Stage added to existing interview', interview });
    } else {
      // If it doesn't exist, create a new interview document
      interview = new Interview({
        profile: profileId,
        stages: [{ stage, time }]
      });
      await interview.save();
      res.status(201).json({ message: 'New interview created with the stage', interview });
    }
  } catch (error) {
    console.error('Error adding or updating stage:', error);  
    res.status(500).json({ error: 'Failed to add or update stage' });
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
export const editStage = async (req, res) => {
  const { interviewId, stageId } = req.params;
  const { stage, time } = req.body;
  console.log("interviewId id is-->", interviewId);
  console.log("stageId id is-->", stageId);
  
  try {
    const interview = await Interview.findOneAndUpdate(
      { _id: interviewId, "stages._id": stageId }, // Match the interview and specific stage
      {
        $set: {
          "stages.$.stage": stage, // Update the stage name
          "stages.$.time": time,   // Update the stage time
        },
      },
      { new: true } // Return the updated document
    );

    if (!interview) {
      return res.status(404).json({ message: 'Interview or Stage not found' });
    }

    res.status(200).json({ message: 'Stage updated successfully', interview });
  } catch (error) {
    res.status(500).json({ message: 'Error updating stage', error });
  }
};

// Delete a specific stage
export const deleteStage = async (req, res) => {
  const { interviewId, stageId } = req.params;
   
  try {
    const interview = await Interview.findByIdAndUpdate(
      interviewId,
      { $pull: { stages: { _id: stageId } } }, // Remove the stage with the given ID
      { new: true } // Return the updated document
    );

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.status(200).json({ message: 'Stage deleted successfully', interview });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting stage', error });
  }
};
