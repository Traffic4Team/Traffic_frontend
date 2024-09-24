// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuth();

  return auth ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
