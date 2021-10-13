import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

const LoginForm = () => {
  //context
  const { loginUser } = useContext(AuthContext);
  //local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };
  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: 'danger', message: loginData.message });
        setTimeout(() => setAlert(null), 4000);
      }
    } catch (error) {}
  };

  return (
    <>
      <Form onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className="my-2">
          <Form.Label className="d-flex justify-content-start">
            <span style={{ marginLeft: '8px' }}> Email address</span>
          </Form.Label>
          <Form.Control
            type="text"
            required
            name="username"
            id="emai"
            placeholder="email address"
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>

        <Form.Group className="my-2">
          <Form.Label className="d-flex justify-content-start">
            <span style={{ marginLeft: '8px' }}>Password </span>
          </Form.Label>
          <Form.Control
            type="password"
            required
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className="py-1 mt-16 my-2"
          name="login"
        >
          Login
        </Button>
      </Form>
      <div>
        <span className="mx-2">Don't have an account?</span>
        <Link to="/register">
          <Button variant="success" size="sm">
            Create Account
          </Button>
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
