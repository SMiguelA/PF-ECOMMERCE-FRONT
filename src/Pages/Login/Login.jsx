import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"
import { useEffect } from "react";
import { DivContainerForm, DivForm, StyledLink } from "../../ComponentsStyles";
import { login } from "../../Redux/Actions";
import { LoadingForm, LoginGoogle } from "../../Components";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
       if(user){
         navigate("/")
       }
  },[user])


  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login({ email, password }));
  };



  return (
    
    
    <DivContainerForm>
      {/* <LoadingForm/> */}
      
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
        <LoginGoogle/>

<p className={styles.signup}>Don't have an account?
<StyledLink to="/signup">
  <b >Sign up</b>
</StyledLink>
		
	</p>
      </DivForm>
    </DivContainerForm>
  );
}

export default Login;
