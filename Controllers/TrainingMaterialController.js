import TrainingMaterialModel from '../models/TrainingMaterial.js';

 // Create a new training material
export const createTrainingMaterial = async (req, res) => {
  try {
    const { fileType, profileId } = req.body;

    // Validate the input
    if (!req.file || !profileId) {
      return res.status(400).json({ error: 'File and profileId are required' });
    }

    const trainingMaterial = new TrainingMaterialModel({
      originalName: req.file.originalname,
      fileType,
      filePath: req.file.path,
      profileId,
    });

    const savedMaterial = await trainingMaterial.save();
    res.status(201).json({
      message: 'Training material uploaded successfully',
      data: savedMaterial,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 //Get all training materials
 
export const getAllTrainingMaterials = async (req, res) => {
  try {
    const materials = await TrainingMaterialModel.find().populate('profileId', 'name department'); // Replace 'name' & 'department' with actual fields in Profile
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 //Get training materials by profile ID
 
export const getTrainingMaterialsByProfile = async (req, res) => {
  try {
    const { profileId } = req.params;

    const materials = await TrainingMaterialModel.find({ profileId }).populate('profileId', 'name department');
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete a training material by ID

export const deleteTrainingMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMaterial = await TrainingMaterialModel.findByIdAndDelete(id);

    if (!deletedMaterial) {
      return res.status(404).json({ error: 'Training material not found' });
    }

    res.status(200).json({ message: 'Training material deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// import TrainingMaterialModel from '../Models/TrainingMaterial.js';

// /**
//  * Controller to handle the creation of a new training material.
//  * Expects the `file` from middleware and `fileType` from the request body.
//  */
// export const createTrainingMaterial = async (req, res) => {
//   try {    
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const { fileType } = req.body;    

//     if (!['pdf', 'mp4', 'word'].includes(fileType)) {
//       return res.status(400).json({ error: 'Invalid file ' });
//     }

//     const trainingMaterial = new TrainingMaterialModel({
//       originalName: req.file.originalname,
//       fileType,
//       filePath: req.file.path,
//     });

//     await trainingMaterial.save();

//     res.status(201).json({
//       message: 'Training material uploaded successfully',
//       data: trainingMaterial,
//     });
//   } catch (error) {
//     console.error('Error creating training material:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// /**
//  * Controller to retrieve all training materials.
//  */
// export const getAllTrainingMaterials = async (req, res) => {
//   try {
//     const trainingMaterials = await TrainingMaterialModel.find();
//     res.status(200).json(trainingMaterials);
//   } catch (error) {
//     console.error('Error retrieving training materials:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// /**
//  * Controller to retrieve training materials by file type.
//  * Expects `fileType` as a route parameter.
//  */
// export const getTrainingMaterialsByType = async (req, res) => {
//   try {
//     const { fileType } = req.params;

//     if (!['pdf', 'mp4', 'word'].includes(fileType)) {
//       return res.status(400).json({ error: 'Invalid file type' });
//     }

//     const trainingMaterials = await TrainingMaterialModel.find({ fileType });
//     res.status(200).json(trainingMaterials);
//   } catch (error) {
//     console.error('Error retrieving training materials by type:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// /**
//  * Controller to delete a training material by ID.
//  * Expects `id` as a route parameter.
//  */
// export const deleteTrainingMaterial = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const trainingMaterial = await TrainingMaterialModel.findByIdAndDelete(id);

//     if (!trainingMaterial) {
//       return res.status(404).json({ error: 'Training material not found' });
//     }

//     res.status(200).json({ message: 'Training material deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting training material:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
