import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingForm, LoginGoogle } from "../../Components";
import { DivContainerForm, DivForm, StyledLink } from "../../ComponentsStyles";
import { LoadingActionForm, signup } from "../../Redux/Actions";
import axios from "../../axios";
import styles from "./Signup.module.css";
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
    picture: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setValues({
          name: "",
          email: "",
          password: "",
          picture: "",
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
    const { name, email, password, picture } = values;

    const validationErrors = validateLoginForm(name, email, password, picture);
    setErrors(validationErrors);

    console.log(errors, "errors");
    if (Object.keys(validationErrors).length !== 0) {
      return null;
    }

    dispatch(LoadingActionForm(true));
    dispatch(signup({ name, email, password, picture }));
    setErrors({});
  };

  //imagen
  const [picture, setPicture] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "diiu7oy9z",
        uploadPreset: "front-end-preset",
      },
      (error, result) => {
        if (!error && result.event === "success") {
          const imageUrl = result.info.url;
          const publicId = result.info.public_id;
          setPicture([{ url: imageUrl, public_id: publicId }]);
          setValues((prevValues) => ({
            ...prevValues,
            picture: imageUrl,
          }));
        }
      }
    );
    widget.open();
  }

  function handleRemoveImg(imgObj) {
    setValues({
      ...values,
      picture: "",
    });
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setPicture([]);
      })
      .catch((e) => console.log(e));
  }

  return (
    <DivContainerForm 
    className={styles.divContainerForm}
    >
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

          <div className={styles.imgsProducts}>
            <button type="button" onClick={showWidget}>
              Upload Image
            </button>
            {errors.picture && (
              <p className={styles.errors}>{errors.picture}</p>
            )}

            <div className={styles.images_preview_container}>
              {picture.length ? (
                <div className={styles.image_preview}>
                  <img src={picture[0].url} alt="Preview" />
                  {imgToRemove !== picture[0].public_id && (
                    <i onClick={() => handleRemoveImg(picture[0])}>X</i>
                  )}
                </div>
              ) : (
                <label>Upload an image</label>
              )}
            </div>
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
