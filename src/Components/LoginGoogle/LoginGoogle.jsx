import { GoogleLogin } from '@react-oauth/google'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { googleLogin ,LoadingActionForm} from '../../Redux/Actions'


export default function LoginGoogle() {
   const dispatch = useDispatch()

    function handleError(){
        console.log("failed Login")
    }

    function handleSuccess( CredentialResponse){
      // console.log(CredentialResponse);
      dispatch(LoadingActionForm(true))
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
