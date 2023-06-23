import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DivContainerForm, DivForm, StyledLink } from "../../ComponentsStyles";
import { signup, LoadingActionForm, clearErrors } from "../../Redux/Actions";
import { LoadingForm, LoginGoogle } from "../../Components";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "./validate";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loadingLoagin_Register, errorsBack } = useSelector(
    (state) => state
  );
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  console.log(errorsBack);


  useEffect(() => {

    if (user) {
      setTimeout(() => {
        setValues({
          name:"",
          email: "",
          password: "",
        });
        dispatch(LoadingActionForm(false));
        navigate("/");
      }, 500);
    }

    if (errorsBack) {
      console.log(errorsBack);
      const { errorRegister } = errorsBack;
      console.log(errorRegister);
      setTimeout(() => {
      if (errorRegister) {
        
          dispatch(LoadingActionForm(false));
          const validationErrors = validateLoginForm(
            values.name,
            values.email,
            values.password,
            errorRegister.message
          );
          setErrors(validationErrors);
        }
      }, 1000);
    }
  
  }, [user,errorsBack]);
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearErrors());
    const { name, email, password } = values;
    console.log(email);
    const validationErrors = validateLoginForm(name, email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      return null;
    }

    dispatch(LoadingActionForm(true));
    dispatch(signup({ name, email, password }));
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
        <h1>Create an account</h1>
        <form className={styles.formhtml} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name..."
              value={values.name}
              name="name"
              onChange={handleInputChange}
            />
            {errors.name && <p className={styles.errors}>{errors.name}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email..."
              value={values.email}
              name="email"
              onChange={handleInputChange}
            />
            {errors.email && <p className={styles.errors}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password..."
              value={values.password}
              name="password"
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className={styles.errors}>{errors.password}</p>
            )}
          </div>

          <div className={styles.sign}>
            <button type="submit">Create Account</button>
          </div>
        </form>
        <div className={styles.social_message}>
          <p className={styles.message}>Register with social account</p>
        </div>
          <LoginGoogle />
        <p className={styles.signup}>
          You have an account? <StyledLink to="/login">Login</StyledLink>
        </p>
      </DivForm>
    </DivContainerForm>
  );
}

export default Signup;
