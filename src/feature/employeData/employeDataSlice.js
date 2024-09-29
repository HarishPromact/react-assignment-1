import { createSlice } from "@reduxjs/toolkit";

/* Employee Data Slice */
const employeeDataSlice = createSlice({
  name: "employeeData",
  initialState: [],
  reducers: {
    /* Add Employee */
    addEmployee: (state, action) => {
      state.push(action.payload);
    },

    /* Remove Employee  */
    removeEmployee: (state, action) => {
      return state.filter((employee) => employee.id !== action.payload);
    },

    /* Edit Employee */
    editEmployee: (state, action) => {
        const index = state.findIndex((employee) => employee.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      },
      
  },
});

/* Exporting Actions and Reducers */
export const { addEmployee, removeEmployee, editEmployee } = employeeDataSlice.actions;
export const employeeDataReducer = employeeDataSlice.reducer;
