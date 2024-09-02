import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Coins from "../../Pages/Coin";
import YouTube from "../../Pages/YouTube";
import Exchange from "../../Pages/Exchange";
import {  Navigate } from "react-router-dom";
import ProtectedRoute from "../../PrivateRoute";

function AppRoutes() {
  
  return (
    <Routes>
            {/* Protected Routes */}
            <Route
                path="/Dashboard"
                element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
                path="/video-upload"
                element={<ProtectedRoute element={<YouTube />} />}
            />
            <Route
                path="/coins"
                element={<ProtectedRoute element={<Coins />} />}
            />
            <Route
                path="/customers"
                element={<ProtectedRoute element={<Customers />} />}
            />
            <Route
                path="/Exchange"
                element={<ProtectedRoute element={<Exchange />} />}
            />

           
            {/* Redirect all other routes to login */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
  );
}
export default AppRoutes;
