import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectNotSignedIn = ({ children }) => {
  const token = localStorage.getItem('token');
  return !token ? <Navigate to="/sign-in" /> : children;
};

export default ProtectNotSignedIn;