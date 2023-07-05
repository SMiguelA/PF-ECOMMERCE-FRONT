import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../Redux/Actions";
import "./Profile.css";

export default function Profile() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [samePassword, setSamePassword] = useState(false);

  const notify = () =>
    toast("Profile updated!", {
      icon: "🎮",
      style: {
        borderRadius: "10px",
        background: "#fff",
        color: "#333",
      },
      duration: 3000,
      position: "bottom-right",
    });

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email) {
      return alert("Please fill out all the fields");
    }
    const data = {
      name,
      email,
    };

    dispatch(updateUser(user._id, data));
    notify();
  }

  function handleSubmitPassword(e) {
    e.preventDefault();

    if (!password1 || !password2 || !samePassword) {
      return alert("Please fill out all the fields");
    } else {
      const data = {
        password: password2,
      };
      dispatch(updateUser(user._id, data));
      notify();
    }
  }

  return (
    <>
      <form className="containerForm" onSubmit={handleSubmit}>
        <h1>Profile Settings</h1>

        <hr />

        <div className="productName">
          <label>Name</label>
          <input
            type="text"
            placeholder="Product name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="productName">
          <label>Email</label>
          <input
            type="text"
            placeholder="User email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            //   disabled={isLoading || isSuccess}
          >
            Update Info
          </button>
        </div>
      </form>

      <form className="containerForm" onSubmit={handleSubmitPassword}>
        <hr />

        <div className="productName">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password1}
            required
            onChange={(e) => setPassword1(e.target.value)}
          />
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password2}
            required
            onChange={(e) => {
              setPassword2(e.target.value);
              setSamePassword(e.target.value === password1);
            }}
          />
          {samePassword ? null : <p>Password incorrect</p>}
        </div>

        <div>
          <button
            type="submit"
            //   disabled={isLoading || isSuccess}
          >
            Update Password
          </button>
        </div>
      </form>
    </>
  );
}
