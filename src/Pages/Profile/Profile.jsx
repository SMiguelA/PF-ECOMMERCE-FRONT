import React, { useState } from "react";
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
    }
  }

  return (
    <>
      <form className="containerForm" onSubmit={handleSubmit}>
        <h1>Profile Settings</h1>
        <h5 className="h3-warning">
          Warning! Any changes you make will close your session
        </h5>
        <hr />
        <div className="image-perfil-container">
          <div>
            <img
              src={
                user.image
                  ? user.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="Image Perfil"
            />
          </div>
          <div>
            <button>Upload Image</button>
            <a>Remove Image</a>
          </div>
        </div>
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
