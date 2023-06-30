import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin, LoadingActionForm } from "../../Redux/Actions";

export default function LoginGoogle() {
  const dispatch = useDispatch();
  const [windowActive, setWindowActive] = useState(false);

  useEffect(() => {
    if (windowActive) {
      dispatch(LoadingActionForm(true));
    }
  }, [windowActive]);
  function handleError() {
    console.log("failed Login");
  }

  function handleSuccess(CredentialResponse) {
    // console.log(CredentialResponse);
    dispatch(LoadingActionForm(true));
    dispatch(googleLogin(CredentialResponse.credential));
  }

  function handleWindow() {
    console.log("CLICK GOOGLE");
    setWindowActive(true);
  }

  return (
    <div style={{display:"flex"}}>
      <GoogleLogin onError={handleError} onSuccess={handleSuccess} />
    </div>

  );
}
