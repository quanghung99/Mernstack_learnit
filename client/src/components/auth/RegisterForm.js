import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from 'react';
import AlertMessage from '../layout/AlertMessage';

const RegisterForm = () => {
  //context
  const { registerUser } = useContext(AuthContext);
  //local state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  //handle onchange Input
  const onChangeRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  //handle onsubmit
  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Password do not match' });
      setTimeout(() => setAlert(null), 3500);
      return;
    }
    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setAlert({ type: 'danger', message: registerData.message });
        setTimeout(() => setAlert(null), 3500);
      }
    } catch (error) {}
  };

  return (
    <>
      <Form onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group className="Email">
          <Form.Label>Emai address</Form.Label>
          <Form.Control
            type="text"
            required
            name="username"
            placeholder="Email address"
            value={username}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>

        <Form.Group className="Password">
          <Form.Label> Password </Form.Label>
          <Form.Control
            type="password"
            required
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Form.Group className="confirmPassword">
          <Form.Label> Confirm Password </Form.Label>
          <Form.Control
            type="password"
            required
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className="py-1 mt-16 my-2"
          name="register"
          value="register"
        >
          Register
        </Button>
      </Form>
      <div>
        <span className="mx-1"> Already have an account?</span>
        <Link to="/login">
          <Button variant="success" size="sm">
            Login
          </Button>
        </Link>
      </div>
    </>
  );
};
export default RegisterForm;
