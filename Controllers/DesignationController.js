import DesignationModel from '../Models/Designation.js';

class DesignationController {
  static createDesignation = async (req, res) => {
    const { DesignationName, DepartmentName } = req.body;

    if (DesignationName && DepartmentName) {
      try {
        const designation = new DesignationModel({
          DesignationName: DesignationName,
          DepartmentName: DepartmentName,
        });

        await designation.save();
        res.status(201).send({
          status: "success",
          message: "Designation added successfully",
          data: designation,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Failed to add designation",
        });
      }
    } else {
      res.status(400).send({
        status: "failed",
        message: "All fields are required",
      });
    }
  };

  // Get details of a single designation by ID
  static getDesignation = async (req, res) => {
    try {
      const designation = await DesignationModel.findById(req.params.id);
      if (designation) {
        res.status(200).send({
          status: "success",
          data: designation,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "Designation not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to fetch designation",
      });
    }
  };

  // Get all designations
  static getAllDesignations = async (req, res) => {
    try {
      const designations = await DesignationModel.find();
      res.status(200).send({
        status: "success",
        data: designations,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to fetch designations",
      });
    }
  };

  // Update designation details
  static updateDesignation = async (req, res) => {
    const { DesignationName, DepartmentName } = req.body;

    try {
      const designation = await DesignationModel.findById(req.params.id);
      if (designation) {
        // Update designation fields
        designation.DesignationName = DesignationName || designation.DesignationName;
        designation.DepartmentName = DepartmentName || designation.DepartmentName;

        await designation.save();
        res.status(200).send({
          status: "success",
          message: "Designation updated successfully",
          data: designation,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "Designation not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to update designation",
      });
    }
  };

  // Delete a designation
  static deleteDesignation = async (req, res) => {
    try {
      const designation = await DesignationModel.findById(req.params.id);
      if (designation) {
        await designation.deleteOne();
        res.status(200).send({
          status: "success",
          message: "Designation deleted successfully",
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "Designation not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to delete designation",
      });
    }
  };
}

export default DesignationController;
