import DepartmentModel from '../Models/Department.js';

class DepartmentController {
  // Create a new department
  static createDepartment = async (req, res) => {
    const { DepartmentName } = req.body;

    // Check if the department name is provided
    if (DepartmentName) {
      try {
        // Create a new department instance
        const department = new DepartmentModel({
          DepartmentName: DepartmentName,
        });

        // Save the department to the database
        await department.save();
        res.status(201).send({
          "status": "success",
          "message": "Department created successfully",
          "data": department,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          "status": "failed",
          "message": "Error while creating department",
        });
      }
    } else {
      res.status(400).send({
        "status": "failed",
        "message": "Department name is required",
      });
    }
  };

  // Get details of a single department by ID
  static getDepartment = async (req, res) => {
    try {
      const department = await DepartmentModel.findById(req.params.id);
      if (department) {
        res.status(200).send({
          "status": "success",
          "data": department,
        });
      } else {
        res.status(404).send({
          "status": "failed",
          "message": "Department not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        "status": "failed",
        "message": "Error fetching department data",
      });
    }
  };

  // Get all departments
  static getAllDepartments = async (req, res) => {
    try {
      const departments = await DepartmentModel.find();
      res.status(200).send({
        "status": "success",
        "data": departments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        "status": "failed",
        "message": "Error fetching departments",
      });
    }
  };

  // Update department details
  static updateDepartment = async (req, res) => {
    const { DepartmentName } = req.body;

    try {
      const department = await DepartmentModel.findById(req.params.id);
      if (department) {
        // Update department fields
        department.DepartmentName = DepartmentName || department.DepartmentName;

        await department.save();
        res.status(200).send({
          "status": "success",
          "message": "Department updated successfully",
          "data": department,
        });
      } else {
        res.status(404).send({
          "status": "failed",
          "message": "Department not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        "status": "failed",
        "message": "Error updating department",
      });
    }
  };

  // Delete a department
  static deleteDepartment = async (req, res) => {
    try {
      const department = await DepartmentModel.findById(req.params.id);
      if (department) {
        await department.deleteOne();
        res.status(200).send({
          "status": "success",
          "message": "Department deleted successfully",
        });
      } else {
        res.status(404).send({
          "status": "failed",
          "message": "Department not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        "status": "failed",
        "message": "Error deleting department",
      });
    }
  };
}

export default DepartmentController;
