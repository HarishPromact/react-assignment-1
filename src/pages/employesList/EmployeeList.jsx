import { useDispatch, useSelector } from "react-redux";
import "./EmployeeList.css";
import { Trash2, UserPen } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ConfirmationDialog from "../../Component/confirmation-dialog/Confirmation-dialog";
import { removeEmployee } from "../../feature/employeData/employeDataSlice";

function EmployeeList() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const dispatch = useDispatch();

  /* open delete dialog */
  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setDialogOpen(true);
  };

  /* Confirm Delete */
  const handleConfirmDelete = () => {
    dispatch(removeEmployee(selectedEmployee.id));
    setDialogOpen(false);
    setSelectedEmployee(null);
  };

  /* Close Dialog */
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEmployee(null);
  };

  /* Employee List */
  const employeeList = useSelector((state) => state.employeeData) || [];

  return (
    <div className="employee-list-container">
      {/* Employee List Title */}
      <h2 className="employee-list-title">Employee List</h2>
      {employeeList.length > 0 ? (
        <div className="table-responsive">
          {/* Table */}
          <table className="employee-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Date of Birth</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            {/* Table Rows */}
            <tbody>
              {/* Table Data */}
              {employeeList.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.fullName}</td>
                  <td>{employee.birthDate}</td>
                  <td>{employee.department}</td>
                  <td>{employee.experience} years</td>
                  <td>
                     {/* Edit button */}
                    <NavLink to={`/edit/${employee.id}`} aria-label="Edit">
                      <button className="icon-button">
                        <UserPen />
                      </button>
                    </NavLink>
                    {/* Delete button */}
                    <button
                      className="icon-button delete-icon"
                      aria-label="Delete"
                      onClick={() => handleDeleteClick(employee)}
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Confirmation Dialog */}
          <ConfirmationDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleConfirmDelete}
          />
        </div>
      ) : (
        <p className="no-employees">No employees found.</p>
      )}
    </div>
  );
}

export default EmployeeList;
