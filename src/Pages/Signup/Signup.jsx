import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { signup } from "../../Redux/Actions";
import style from "./Signup.module.css";

function Signup() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleSignup(e) {
    e.preventDefault();
    dispatch(signup({ name, email, password }));
  }

  return (
    <div className={style.Container}>
      <h1>Create an account</h1>
      <form style={{ width: "100%" }} onSubmit={handleSignup}>
        <div>
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Create Account</button>
        </div>
      </form>

      <p className="pt-3 text-center">
        Don't have an account? <Link to="/login">Login</Link>{" "}
      </p>
    </div>
  );
}

export default Signup;
