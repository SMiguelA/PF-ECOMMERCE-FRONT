import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "../../Redux/Actions";

function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin(e) {
    e.preventDefault();
    dispatch(login({ email, password }));
  }
  return (
    <div>
      <h1>Login to your account</h1>
      <form style={{ width: "100%" }} onSubmit={handleLogin}>
        <div>
          <label>Email Address</label>
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
            placeholder="Enter Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>

      <p className="pt-3 text-center">
        Don't have an account? <Link to="/signup">Create account</Link>{" "}
      </p>
    </div>
  );
}

export default Login;
