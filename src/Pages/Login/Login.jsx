import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyledLink, DivForm, DivContainerForm } from "../../ComponentsStyles";
import styles from "./Login.module.css";
import { login } from "../../Redux/Actions";
import { LoginGoogle } from "../../Components";

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin(e) {
    e.preventDefault()
    alert("Login normal")
    dispatch(login({ email, password }));
    
  }
  function handleGoogle(e){
    alert("google")
  }
  return (
    <DivContainerForm>
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
            <button  type="submit">Login</button>
          </div>
        </form>
        <div className={styles.social_message}>
          <p className={styles.message}>Login with social account</p>
        </div>
        <LoginGoogle/>

<p className={styles.signup}>Don't have an account?
<StyledLink to="/register_user">
  <b >Sign up</b>
</StyledLink>
		
	</p>
      </DivForm>
    </DivContainerForm>
  );
}

export default Login;
