import EmployeeModel from '../Models/Employee.js'

class EmployeeController {
  
  // Create a new employee
  static createEmployee = async (req, res) => {
    const { name, profile, department, designation } = req.body;
    
    if (name && profile && department && designation) {
      try {
        const employee = new EmployeeModel({
          name: name,
          profile: profile,
          department: department,
          designation: designation
        });
        
        // Save employee to database
        await employee.save();
        res.status(201).send({
          "status": "success",
          "message": "Employee added successfully",
          "data": employee
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          "status": "failed",
          "message": "Failed to add employee"
        });
      }
    } else {
      res.status(400).send({
        "status": "failed",
        "message": "All fields are required"
      });
    }
  }

  // Get details of a single employee by ID
  static getEmployee = async (req, res) => {
    try {
      const employee = await EmployeeModel.findById(req.params.id);
      if (employee) {
        res.status(200).send({
          "status": "success",
          "data": employee
        });
      } else {
        res.status(404).send({
          "status": "failed",
          "message": "Employee not found"
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        "status": "failed",
        "message": "Failed to fetch employee data"
      });
    }
  }

  // Get all employees
  static getAllEmployees = async (req, res) => {
    try {
      const employees = await EmployeeModel.find();
      res.status(200).send({
        "status": "success",
        "data": employees
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        "status": "failed",
        "message": "Failed to fetch employees"
      });
    }
  }

  // Update employee details
  static updateEmployee = async (req, res) => {
    const { name, profile, department, designation } = req.body;
    
    try {
      const employee = await EmployeeModel.findById(req.params.id);
      if (employee) {
        // Update employee fields
        employee.name = name || employee.name;
        employee.profile = profile || employee.profile;
        employee.department = department || employee.department;
        employee.designation = designation || employee.designation;
        
        await employee.save();
        res.status(200).send({
          "status": "success",
          "message": "Employee updated successfully",
          "data": employee
        });
      } else {
        res.status(404).send({
          "status": "failed",
          "message": "Employee not found"
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        "status": "failed",
        "message": "Failed to update employee"
      });
    }
  }

  // Delete an employee
  static deleteEmployee = async (req, res) => {
    try {
      const employee = await EmployeeModel.findById(req.params.id);
      if (employee) {
        await employee.deleteOne();
        res.status(200).send({
          "status": "success",
          "message": "Employee deleted successfully"
        });
      } else {
        res.status(404).send({
          "status": "failed",
          "message": "Employee not found"
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        "status": "failed",
        "message": "Failed to delete employee"
      });
    }
  }
}

export default EmployeeController;
