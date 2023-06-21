// import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { DivContainerForm, DivForm, StyledLink } from "../../ComponentsStyles";
import { login, LoadingActionForm, clearErrors } from "../../Redux/Actions";
import { LoadingForm, LoginGoogle } from "../../Components";
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
      if(Object.keys(errorLogin).length > 0) {
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
    <DivContainerForm>
      {loadingLoagin_Register && (
        <div className={styles.loading}>
          <LoadingForm />
        </div>
      )}

      <DivForm>
        <p className={styles.title}>Inicia sesión</p>
        <form className={styles.formhtml} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email </label>
            <input
              type="text"
              placeholder="Enter email"
              value={values.email}
              name="email"
              onChange={handleInputChange}
            />
            {errors.email && <p className={styles.errors}>{errors.email}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={values.password}
              name="password"
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className={styles.errors}>{errors.password}</p>
            )}
          </div>
          <div className={styles.containerForgotPassword}>
            <a>Forgot Password ?</a>
          </div>
          <div className={styles.sign}>
            <button type="submit">Login</button>
          </div>
        </form>
        <div className={styles.social_message}>
          <p className={styles.message}>Login with social account</p>
        </div>
        <LoginGoogle />

        <p className={styles.signup}>
          Don't have an account?
          <StyledLink to="/signup">
            <b>Sign up</b>
          </StyledLink>
        </p>
      </DivForm>
    </DivContainerForm>
  );
}

export default Login;
