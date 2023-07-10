import "./App.css";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import EmpList from "./components/employee/employee-list/EmpList";
import AddEmp from "./components/employee/add-emp/AddEmp";
import ViewEmp from "./components/employee/view-emp/ViewEmp";
import EditEmp from "./components/employee/edit-emp/EditEmp";

function App() {
  return (
    <>
  
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Navigate to={"/employees/list"} />} />
        <Route path={"/employees/list"} element={<EmpList />} />
        <Route path={"/employees/add"} element={<AddEmp />} />
        <Route path={"/employees/view/:empId"} element={<ViewEmp />} />
        <Route path={"/employees/edit/:empId"} element={<EditEmp />} />
      </Routes>
    </>
  );
}

export default App;
