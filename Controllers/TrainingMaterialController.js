import TrainingMaterial from '../Models/TrainingMaterial.js';

// Create a new training material
export const createTrainingMaterial = async (req, res) => {
  try {
    const { type, link } = req.body;

    // Validate inputs
    if (!['video', 'docx', 'pdf'].includes(type)) {
      return res.status(400).json({ message: 'Invalid type' });
    }

    const newMaterial = new TrainingMaterial({ type, link });
    const savedMaterial = await newMaterial.save();

    res.status(201).json(savedMaterial);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create training material', error });
  }
};

// Get all training materials
export const getAllTrainingMaterials = async (req, res) => {
  try {
    const materials = await TrainingMaterial.find();
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch training materials', error });
  }
};

// Get a single training material by ID
export const getTrainingMaterialById = async (req, res) => {
  try {
    const material = await TrainingMaterial.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Training material not found' });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch training material', error });
  }
};

// Update a training material
export const updateTrainingMaterial = async (req, res) => {
  try {
    const { type, link } = req.body;
    const material = await TrainingMaterial.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: 'Training material not found' });
    }

    material.type = type || material.type;
    material.link = link || material.link;

    const updatedMaterial = await material.save();
    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update training material', error });
  }
};

// Delete a training material
export const deleteTrainingMaterial = async (req, res) => {
  try {
    const material = await TrainingMaterial.findByIdAndDelete(req.params.id);

    if (!material) {
      return res.status(404).json({ message: 'Training material not found' });
    }

    res.status(200).json({ message: 'Training material deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete training material', error });
  }
};
