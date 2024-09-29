import { useFormik } from "formik";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  editEmployee,
} from "../../feature/employeData/employeDataSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function AddEditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEditMode = id !== undefined;
  const employeeList = useSelector((state) => state.employeeData) || [];

  /* Validation */
  const validate = (values) => {
    const errors = {};

    // Full Name Validation
    if (!values.fullName) {
      errors.fullName = "Required";
    } else if (!/^[a-zA-Z\s]+$/.test(values.fullName)) {
      errors.fullName = "Only characters are allowed";
    }

    // Birth Date Validation
    if (!values.birthDate) {
      errors.birthDate = "Required";
    }

    // Department Validation
    if (!values.department) {
      errors.department = "Required";
    }

    // Experience Validation
    if (!values.experience) {
      errors.experience = "Required";
    } else if (isNaN(values.experience)) {
      errors.experience = "Experience must be a number";
    } else if (values.experience < 0) {
      errors.experience = "Experience cannot be negative";
    }

    return errors;
  };

  /* Add Employee Form */
  const addEmployeeForms = useFormik({
    initialValues: {
      fullName: "",
      birthDate: "",
      department: "",
      experience: "",
    },
    validate,
    onSubmit: (values) => {
      const newEmployee = {
        id: isEditMode ? id : uuidv4(),
        ...values,
      };
      if (isEditMode) {
        dispatch(editEmployee(newEmployee));
      } else {
        dispatch(addEmployee(newEmployee));
      }
      navigate("/list");
      addEmployeeForms.resetForm();
    },
  });

  /* useEffect */
  useEffect(() => {
    /* Edit Employee */
    if (isEditMode) {
      const selectedEmployee = employeeList.find(
        (employee) => employee.id === id
      );
      if (selectedEmployee) {
        addEmployeeForms.setValues(selectedEmployee);
      } else {
        navigate("/list");
      }
    } else {
      addEmployeeForms.resetForm();
    }
  }, [employeeList, id]);

  /* Form Validation */
  const isFormValid =
    Object.keys(addEmployeeForms.errors).length === 0 &&
    Object.values(addEmployeeForms.values).every((x) => x !== "");

  return (
    <div className="container">
      <form onSubmit={addEmployeeForms.handleSubmit} className="form-container">
        {/* Form Title */}
        <h2 className="form-title">
          {isEditMode ? "Edit" : "Add"} Employee Details
        </h2>

        {/* Form Row */}
        <div className="form-row">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              name="fullName"
              className="form-input"
              onChange={addEmployeeForms.handleChange}
              onBlur={addEmployeeForms.handleBlur}
              value={addEmployeeForms.values.fullName}
            />
            {addEmployeeForms.touched.fullName &&
              addEmployeeForms.errors.fullName && (
                <div className="error validation-color">
                  {addEmployeeForms.errors.fullName}
                </div>
              )}
          </div>

          {/* Birth Date */}
          <div className="form-group">
            <label htmlFor="birthDate" className="form-label">
              D.O.B
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              className="form-input"
              onChange={addEmployeeForms.handleChange}
              onBlur={addEmployeeForms.handleBlur}
              value={addEmployeeForms.values.birthDate}
            />
            {addEmployeeForms.touched.birthDate &&
              addEmployeeForms.errors.birthDate && (
                <div className="error validation-color">
                  {addEmployeeForms.errors.birthDate}
                </div>
              )}
          </div>
        </div>

        {/* Form Row */}
        <div className="form-row">
          {/* Department */}
          <div className="form-group">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              id="department"
              name="department"
              className="form-input"
              onChange={addEmployeeForms.handleChange}
              onBlur={addEmployeeForms.handleBlur}
              value={addEmployeeForms.values.department}
            >
              <option value="" label="Select department" />
              <option value="QA" label="QA" />
              <option value="Development" label="Development" />
              <option value="HR" label="HR" />
              <option value="IT" label="IT" />
              <option value="Finance" label="Finance" />
            </select>
            {addEmployeeForms.touched.department &&
              addEmployeeForms.errors.department && (
                <div className="error validation-color">
                  {addEmployeeForms.errors.department}
                </div>
              )}
          </div>

          <div className="form-group">
            {/* Experience */}
            <label htmlFor="experience" className="form-label">
              Experience (in years)
            </label>
            <input
              id="experience"
              name="experience"
              type="number"
              className="form-input"
              onChange={addEmployeeForms.handleChange}
              onBlur={addEmployeeForms.handleBlur}
              value={addEmployeeForms.values.experience}
            />
            {addEmployeeForms.touched.experience &&
              addEmployeeForms.errors.experience && (
                <div className="error validation-color">
                  {addEmployeeForms.errors.experience}
                </div>
              )}
          </div>
        </div>

        {/* Button Container */}
        <div className="button-container">
          {/* Back Button */}
          <button
            type="button"
            className="btn btn-back"
            onClick={() => navigate("/list")}
          >
            Back
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className={isFormValid ? "btn btn-submit" : "btn btn-disabled"}
            disabled={!isFormValid}
          >
            {isEditMode ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditEmployee;
