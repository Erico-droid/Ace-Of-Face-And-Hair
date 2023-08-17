import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return React.cloneElement(element, rest);
};

export default ProtectedRoute;