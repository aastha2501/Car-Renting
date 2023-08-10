import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const ProtectedRoute = ({ roles, children }) => {
  const token = localStorage.getItem('token'); 
  //debugger;
  if (!token) {
   
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);

    const userRoles = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (roles.some(role => userRoles.includes(role))) {
    return children;
    } else if(userRoles == "User") {
      return <Navigate to="/dashboard"/>
    } else if(userRoles == "Admin") {
      return <Navigate to="/admin"/>
    }
     else {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error('Error verifying JWT token:', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;