import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';

const Auth = ({ authRoute }) => {
  let body;

  const {
    authState: { isAuthenticated, authLoading },
  } = useContext(AuthContext);

  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
    );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learn it</h1>
          <h4>Keep up with your determation</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
