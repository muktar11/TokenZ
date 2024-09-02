import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    if (!token) {
        // If no token is found, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If token is found, render the provided component
    return element;
};

export default ProtectedRoute;
