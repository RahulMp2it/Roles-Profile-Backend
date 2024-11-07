import DesignationModel from "../Models/Designation.js";
import Department from "../Models/Department.js";

class DesignationController {
  // Create designation
  static createDesignation = async (req, res) => {
    const { DesignationName, department } = req.body;

    if (DesignationName && department) {
      try {
        // Check if the provided department exists
        const foundDepartment = await Department.findById(department);
        if (!foundDepartment) {
          return res.status(404).send({
            status: "failed",
            message: "Invalid department provided",
          });
        }

        const designation = new DesignationModel({
          DesignationName,
          department: foundDepartment._id, // Reference ObjectId
        });

        // Save designation to database
        await designation.save();

        return res.status(201).send({
          status: "success",
          message: "Designation added successfully",
          data: designation,
        });
      } catch (error) {
        console.error(error);
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

  // Get designation by department ID
  static getDesignationsByDepartment = async (req, res) => {
    const { departmentId } = req.params;
    // console.log(departmentId);
    try {
      const designations = await DesignationModel.find({ department: departmentId });
      if (designations.length > 0) {
        res.status(200).send({
          status: "success",
          data: designations,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "No Designation found for this department",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Error fetching designation by department",
      });
    }
  };

  // Get details of a single designation by ID (populate department)
  static getDesignation = async (req, res) => {
    try {
      const designation = await DesignationModel.findById(req.params.id)
        .populate("department", "DepartmentName"); // Populate department details

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
      console.error(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to fetch designation data",
      });
    }
  };

  // Get all designations with populated fields
  static getAllDesignations = async (req, res) => {
    try {
      const designations = await DesignationModel.find().populate("department");

      res.status(200).send({
        status: "success",
        data: designations,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to fetch designations",
      });
    }
  };

  // Update designation details
  static updateDesignation = async (req, res) => {
    const { DesignationName, department } = req.body;

    try {
      const designation = await DesignationModel.findById(req.params.id);
      if (designation) {
        // Validate the provided department (if provided)
        if (department) {
          const foundDepartment = await Department.findById(department);
          if (!foundDepartment) {
            return res.status(404).send({
              status: "failed",
              message: "Invalid department provided",
            });
          }
          designation.department = foundDepartment._id; // Update department
        }

        // Update designation fields
        designation.DesignationName = DesignationName || designation.DesignationName;

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
      console.error(error);
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
      console.error(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to delete designation",
      });
    }
  }
}

export default DesignationController;
