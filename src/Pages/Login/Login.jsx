import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingForm, LoginGoogle } from "../../Components";
import { DivContainerForm, DivForm, StyledLink } from "../../ComponentsStyles";
import { LoadingActionForm, login } from "../../Redux/Actions";
import styles from "./Login.module.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loadingLoagin_Register } = useSelector((state) => state);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        dispatch(LoadingActionForm(false));
        navigate("/");
      }, 500);
    }
  }, [user]);

  const handleLogin = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");
    console.log(token);
    dispatch(LoadingActionForm(true));
    dispatch(login({ email, password }));
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
        <form className={styles.formhtml} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email </label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
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
