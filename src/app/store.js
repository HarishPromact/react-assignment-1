import { configureStore } from "@reduxjs/toolkit";
import { employeeDataReducer } from "../feature/employeData/employeDataSlice";

export const store = configureStore({
  // Add Reducers
  reducer: {
    employeeData: employeeDataReducer,
  },
});
