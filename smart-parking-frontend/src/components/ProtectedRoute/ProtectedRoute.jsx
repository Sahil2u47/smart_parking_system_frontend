import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const {
    isAuthenticated,
    user,
  } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (allowedRoles?.length > 0) {
    const userRole = user?.role?.toUpperCase();

    if (
      !userRole ||
      !allowedRoles.includes(userRole)
    ) {
      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }
  }

  return children;
}

export default ProtectedRoute;
