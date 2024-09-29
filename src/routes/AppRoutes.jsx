import { Navigate, Route, Routes } from "react-router-dom";
import EmployeeList from "../pages/employesList/employeeList";
import AddEditEmployee from "../pages/addEditEmployee/AddEditEmployee";
import NotFound from "../Component/not-found/NotFound";

function AppRoutes() {
  return (
    // App Routes
    <Routes>
      <Route path="/" element={<Navigate to="/list" replace />} />
      <Route path="/list" element={<EmployeeList />} />
      <Route path="/add" element={<AddEditEmployee />} />
      <Route path="/edit/:id" element={<AddEditEmployee />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
