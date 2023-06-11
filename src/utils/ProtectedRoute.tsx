import React, { Fragment, ReactNode, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Fragment>{isLoggedIn ? children : <Navigate to="/login" />}</Fragment>
  );
}

export default ProtectedRoute;
