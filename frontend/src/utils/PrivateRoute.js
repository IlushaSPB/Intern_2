// PrivateRoute.js
import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useContext(AuthContext);

  return <Route {...rest} element={user ? <Element /> : <Navigate to="/login" />} />;
};

export default PrivateRoute;
