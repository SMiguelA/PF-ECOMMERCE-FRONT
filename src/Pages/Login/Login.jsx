// import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { RiLockPasswordLine, RiMailLine } from 'react-icons/ri';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingForm, LoginGoogle } from "../../Components";
import { StyledLink } from "../../ComponentsStyles";
import { LoadingActionForm, clearErrors, login } from "../../Redux/Actions";
import "./login.css";
import { validateLoginForm } from "./validate";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loadingLoagin_Register, errorsBack } = useSelector(
    (state) => state
  );
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setValues({
          email: "",
          password: "",
        });
        dispatch(LoadingActionForm(false));
        navigate("/");
      }, 500);
    }
    if (errorsBack) {
      const { errorLogin } = errorsBack;
      console.log(errorLogin);
      if(errorLogin && Object.keys(errorLogin).length > 0) {
        setTimeout(() => {
        dispatch(LoadingActionForm(false));
        const validationErrors = validateLoginForm(values.email, values.password, errorLogin);
        setErrors(validationErrors);
      }, 500);
      }
    }
    
  }, [user, errorsBack]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearErrors())
    const { email, password } = values;
    console.log(email);
    const validationErrors = validateLoginForm(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      // Realizar la lógica de inicio de sesión aquí
      return null;
    }

    dispatch(LoadingActionForm(true));
    dispatch(login({ email, password }));
    setErrors({});
  };

  return (
    <div className='DivContainerForm'>
      {loadingLoagin_Register && (
        <div className='loading'>
          <LoadingForm />
        </div>
      )}

      <p className='title'>Pixel Port</p>
      <div className='DivForm'>
        <form className='formhtml' onSubmit={handleSubmit}>
          <div className='inputGroup'>
            <RiMailLine className='inputIcon' />
            <input
              type="text"
              placeholder="Email..."
              value={values.email}
              name="email"
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <p className='errors'>{errors.email}</p>}
          <div className='inputGroup'>
            <RiLockPasswordLine className='inputIcon' />
            <input
              type="Password"
              placeholder="Enter Password"
              value={values.password}
              name="password"
              onChange={handleInputChange}
            />
          </div>
          {errors.password && (
            <p className='errors'>{errors.password}</p>
          )}
          <div className='containerForgotPassword'>
          </div>
          <div className='actions'>
            <button className="cancel" onClick={() => navigate('/')}><b>Cancel</b></button>
            <button className='submitButton' type="submit"><b>Login</b></button>
          </div>
        </form>
        <div className="separador">
              <hr />
              <label>O</label>
              <hr />
        </div>
        <div className='socialLog'>
          <LoginGoogle />
        </div>

      </div>
      <p className='signup'>
        Don't have an account?
        <StyledLink to="/signup">
          <b>Sign up</b>
        </StyledLink>
      </p>
    </div>
  );
}

export default Login;
