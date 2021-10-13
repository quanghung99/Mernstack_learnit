import React from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Route, Redirect } from 'react-router-dom';
import NavbarMenu from '../layout/NavbarMenu';
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    <div className="spinner-container">
      <Spinner animation="border" variant="info" />;
    </div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <NavbarMenu />

            <Component {...rest} {...props} />
          </>
        ) : (
          <>
            <Redirect to="/login" />
          </>
        )
      }
    />
  );
};

export default ProtectedRoute;
