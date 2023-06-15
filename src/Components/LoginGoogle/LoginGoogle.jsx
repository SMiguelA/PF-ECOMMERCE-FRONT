import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import { useDispatch } from 'react-redux'
import { googleLogin } from '../../Redux/Actions'


export default function LoginGoogle() {
   const dispatch = useDispatch()
   
    function handleError(){
        console.log("failed Login")
    }

    function handleSuccess( CredentialResponse){
      // console.log(CredentialResponse);
        dispatch(googleLogin(CredentialResponse.credential))
    }

  return (
    <>
    <GoogleLogin 
    
    onError={handleError}
    onSuccess={handleSuccess}
    />
    </>
  )
}
