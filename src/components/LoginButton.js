import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
const LoginButton = () =>{
    const {loginWithRedirect, isAuthenticated} = useAuth0();
    return (
        !isAuthenticated && (
            <span className="text-info" onClick={()=>loginWithRedirect()}>Log In</span>
        )
    )
}

export default LoginButton