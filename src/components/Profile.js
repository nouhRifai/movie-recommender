import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { CAvatar } from '@coreui/react';

const Profile = () =>{
    const {user, isAuthenticated} = useAuth0();
    return (
        isAuthenticated && (
        
        <>
            <CAvatar className='avatar' src={user.picture} alt={user.name}/>
            <h5 className='username text-info'>{user.name}</h5>
        </>)
    )
}

export default Profile