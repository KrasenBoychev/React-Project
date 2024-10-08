/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useLogin } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

import validateLoginForm from '../../formsValidation/validateLogin';

import './LoginAndRegister.css';

const initialValues = { email: '', password: '' };

export default function Login() {
  const login = useLogin();
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState({});

  const loginHandler = async ({ email, password }) => {
    const allErrors = validateLoginForm(email, password);

    if (Object.entries(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    try {
      await login(email, password);

      if (location.state && location.state.length > 0) {
        navigate(`${location.state}`);
        
      } else {
        navigate('/');
      }
      
    } catch (error) {
      return toast.error(error.message);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    loginHandler,
    setErrors
  );

  return (
    <div className="login_section">
      <div className="login-form">
        <form method="post" onSubmit={submitHandler}>
          <h2>Login</h2>
          <div className="form-input">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={changeHandler}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="form-input">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={changeHandler}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>

          <button type="submit">Login</button>
        </form>

        <p>
          Do not have an account? <Link to="/register">Register here</Link>.
        </p>
      </div>
    </div>
  );
}
