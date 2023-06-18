import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DivContainerForm, DivForm , StyledLink} from "../../ComponentsStyles";
import { signup ,LoadingActionForm} from "../../Redux/Actions";
import { LoadingForm, LoginGoogle } from "../../Components";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, loadingLoagin_Register} = useSelector((state) => state)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  useEffect(() => {
    if(user){
     setTimeout(() => {
       dispatch(LoadingActionForm(false))
      navigate("/")
     }, 500);
     
    }
},[user])

  function handleSignup(e) {
    e.preventDefault();
    dispatch(LoadingActionForm(true))
    dispatch(signup({ name, email, password }));
  }

  return (
    <DivContainerForm>
       {
      loadingLoagin_Register &&
      <div className={styles.loading}>
      <LoadingForm />
      </div>
      }
      <DivForm>
    
      <h1>Create an account</h1>
      <form className={styles.formhtml} onSubmit={handleSignup}>
        <div className={styles.inputGroup}>
        <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name..."
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.sign}>
          <button type="submit">Create Account</button>
        </div>
      </form>
      <div className={styles.social_message}>
          <p className={styles.message}>Register with social account</p>
        </div>
        <LoginGoogle/>
      <p className={styles.signup}>
        You have an account? <StyledLink to="/login">Login</StyledLink>
      </p>
    
    </DivForm>
    </DivContainerForm>
  );
}

export default Signup;
