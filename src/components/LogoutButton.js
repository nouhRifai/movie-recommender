import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () =>{
    const {logout, isAuthenticated} = useAuth0();
    return (
        isAuthenticated && (    
        <span className="logout_button text-danger" onClick={()=>logout()}><i className="cil-account-logout"></i>Log Out</span>
        )
    )
}

export default LogoutButton