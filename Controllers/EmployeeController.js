import EmployeeModel from '../Models/Employee.js';
import DepartmentModel from '../Models/Department.js';
import ProfileModel from '../Models/Profile.js';

class EmployeeController {

  // Create a new employee
  static createEmployee = async (req, res) => {
    const { name, email, phone, department } = req.body;

    if (name && email && phone && department) {
      try {
        // Verify that the provided department exists
        const foundDepartment = await DepartmentModel.findById(department);
        if (!foundDepartment) {
          return res.status(404).send({
            status: "failed",
            message: "Invalid department provided",
          });
        }

        const employee = new EmployeeModel({
          name,
          email,
          phone,
          department: foundDepartment._id, // Store d1epartment reference
        });

        // Save employee to the database
        await employee.save();
        res.status(201).send({
          status: "success",
          message: "Employee added successfully",
          data: employee,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          status: "failed",
          message: "Failed to add employee",
        });
      }
    } else {
      res.status(400).send({
        status: "failed",
        message: "All fields are required",
      });
    }
  };

  // Get employees by department ID
  static getEmployeesByDepartment = async (req, res) => {
    const { departmentId } = req.params;
    try {
      const employees = await EmployeeModel.find({ department: departmentId }).populate('department', 'DepartmentName');
      if (employees.length > 0) {
        res.status(200).send({
          status: "success",
          data: employees,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "No employees found for this department",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Error fetching employees by department",
      });
    }
  };

  // Get details of a single employee by ID
  static getEmployee = async (req, res) => {
    try {
      const employee = await EmployeeModel.findById(req.params.id).populate('department', 'DepartmentName');
      if (employee) {
        res.status(200).send({
          status: "success",
          data: employee,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "Employee not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to fetch employee data",
      });
    }
  };

  // Get all employees
  static getAllEmployees = async (req, res) => {
    try {
      const employees = await EmployeeModel.find().populate('department', 'DepartmentName');
      res.status(200).send({
        status: "success",
        data: employees,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to fetch employees",
      });
    }
  };

  // Update employee details
  static updateEmployee = async (req, res) => {
    const { name, email, phone, department } = req.body;

    try {
      const employee = await EmployeeModel.findById(req.params.id);
      if (employee) {
        // Update department if provided and valid
        if (department) {
          const foundDepartment = await DepartmentModel.findById(department);
          if (!foundDepartment) {
            return res.status(404).send({
              status: "failed",
              message: "Invalid department provided",
            });
          }
          employee.department = foundDepartment._id;
        }

        // Update other employee fields
        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.phone = phone || employee.phone;

        await employee.save();
        res.status(200).send({
          status: "success",
          message: "Employee updated successfully",
          data: employee,
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "Employee not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to update employee",
      });
    }
  };

  // Delete an employee
  static deleteEmployee = async (req, res) => {
    try {
      const employee = await EmployeeModel.findById(req.params.id);
      if (employee) {
        await employee.deleteOne();
        res.status(200).send({
          status: "success",
          message: "Employee deleted successfully",
        });
      } else {
        res.status(404).send({
          status: "failed",
          message: "Employee not found",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to delete employee",
      });
    }
  };

  // Assign profile to employee
  static assignProfile = async (req, res) => {
    const { employeeId, profileId } = req.body;

    try {
      const employee = await EmployeeModel.findById(employeeId);

      if (!employee) {
        return res.status(404).send({
          status: "failed",
          message: "Employee not found",
        });
      }

      // Check if all profileIds exist in the Profile collection
      const profiles = await ProfileModel.find({ _id: { $in: profileId } });

      if (profiles.length !== profileId.length) {
        return res.status(404).send({
          status: "failed",
          message: "One or more profiles not found",
        });
      }

      // Filter out profiles that are already assigned to the employee
      const unassignedProfiles = profileId.filter(profileId =>
        !employee.profile.includes(profileId)
      );

      if (unassignedProfiles.length === 0) {
        return res.status(400).send({
          status: "failed",
          message: "All selected profiles are already assigned to this employee",
        });
      }

      // Add unassigned profiles to the employee's profile array
      employee.profile.push(...unassignedProfiles);

      // Save the updated employee
      await employee.save();

      res.status(200).send({
        status: "success",
        message: "Profiles assigned to employee successfully",
        data: employee,
      });

    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "failed",
        message: "Failed to assign profile to employee",
      });
    }
  };
}

export default EmployeeController;





// import EmployeeModel from '../Models/Employee.js'
// import ProfileModel from '../Models/Profile.js';

// class EmployeeController {

//   // Create a new employee
//   static createEmployee = async (req, res) => {
//     const { name, email, phone, } = req.body;

//     if (name && email && phone) {
//       try {
//         const employee = new EmployeeModel({
//           name,
//           email,
//           phone,
//         });

//         // Save employee to the database
//         await employee.save();
//         res.status(201).send({
//           status: "success",
//           message: "Employee added successfully",
//           data: employee,
//         });
//       } catch (error) {
//         console.log(error);
//         res.status(500).send({
//           status: "failed",
//           message: "Failed to add employee",
//         });
//       }
//     } else {
//       res.status(400).send({
//         status: "failed",
//         message: "All fields are required",
//       });
//     }
//   };

//   // Get employees by department ID
//   static getEmployeesByDepartment = async (req, res) => {
//     const { departmentId } = req.params;
//     try {
//       const employees = await EmployeeModel.find({ department: departmentId });
//       if (employees.length > 0) {
//         res.status(200).send({
//           status: "success",
//           data: employees,
//         });
//       } else {
//         res.status(404).send({
//           status: "failed",
//           message: "No employees found for this department",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         status: "failed",
//         message: "Error fetching employees by department",
//       });
//     }
//   };

//   // Get details of a single employee by ID
//   static getEmployee = async (req, res) => {
//     try {
//       const employee = await EmployeeModel.findById(req.params.id);
//       if (employee) {
//         res.status(200).send({
//           status: "success",
//           data: employee,
//         });
//       } else {
//         res.status(404).send({
//           status: "failed",
//           message: "Employee not found",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         status: "failed",
//         message: "Failed to fetch employee data",
//       });
//     }
//   };

//   // Get all employees
//   static getAllEmployees = async (req, res) => {
//     try {
//       const employees = await EmployeeModel.find();
//       res.status(200).send({
//         status: "success",
//         data: employees,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         status: "failed",
//         message: "Failed to fetch employees",
//       });
//     }
//   };

//   // Update employee details
//   static updateEmployee = async (req, res) => {
//     const { name, email, phone } = req.body;

//     try {
//       const employee = await EmployeeModel.findById(req.params.id);
//       if (employee) {
//         // Update employee fields
//         employee.name = name || employee.name;
//         employee.email = email || employee.email;
//         employee.phone = phone || employee.phone;

//         await employee.save();
//         res.status(200).send({
//           status: "success",
//           message: "Employee updated successfully",
//           data: employee,
//         });
//       } else {
//         res.status(404).send({
//           status: "failed",
//           message: "Employee not found",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         status: "failed",
//         message: "Failed to update employee",
//       });
//     }
//   };

//   // Delete an employee
//   static deleteEmployee = async (req, res) => {
//     try {
//       const employee = await EmployeeModel.findById(req.params.id);
//       if (employee) {
//         await employee.deleteOne();
//         res.status(200).send({
//           status: "success",
//           message: "Employee deleted successfully",
//         });
//       } else {
//         res.status(404).send({
//           status: "failed",
//           message: "Employee not found",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         status: "failed",
//         message: "Failed to delete employee",
//       });
//     }
//   };

//   // Assign profile to employee
//   static assignProfile = async (req, res) => {
//     const { employeeId, profileId } = req.body;

//     try {
//       const employee = await EmployeeModel.findById(employeeId.employeeId);

//       if (!employee) {
//         return res.status(404).send({
//           status: "failed",
//           message: "Employee not found",
//         });
//       }

//       // Check if all profileIds exist in the Profile collection
//       const profiles = await ProfileModel.find({ _id: { $in: profileId } });

//       if (profiles.length !== profileId.length) {
//         return res.status(404).send({
//           status: "failed",
//           message: "One or more profiles not found",
//         });
//       }

//       // Filter out profiles that are already assigned to the employee
//       const unassignedProfiles = profileId.filter(profileId =>
//         !employee.profile.includes(profileId)
//       );


//       if (unassignedProfiles.length === 0) {
//         return res.status(400).send({
//           status: "failed",
//           message: "All selected profiles are already assigned to this employee",
//         });
//       }

//       // Add unassigned profiles to the employee's profile array
//       employee.profile.push(...unassignedProfiles);

//       // Save the updated employee
//       await employee.save();

//       res.status(200).send({
//         status: "success",
//         message: "Profiles assigned to employee successfully",
//         data: employee,
//       });

//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         status: "failed",
//         message: "Failed to assign profile to employee",
//       });
//     }
//   };
// }


// export default EmployeeController;
