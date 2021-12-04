import React from 'react';
import {
    CNavbarBrand,
    CNavbar,
    CContainer,
    CNavbarNav,
    CNavbarToggler,
    CCollapse,
    CNavItem,
        } from '@coreui/react'
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

const NavBar = () => {

    const [visible, setVisible] = useState(false)
    const {isAuthenticated} = useAuth0();
    return (
        <CNavbar expand="lg" colorScheme={isAuthenticated ? "dark" : "dark"} className="bg-dark">
            <CContainer fluid>
                <CNavbarBrand href="#">MReco</CNavbarBrand>
                <CNavbarToggler onClick={() => setVisible(!visible)} />
                <CCollapse className="navbar-collapse flexy-end" visible={visible}>
                <CNavbarNav >
                    <CNavItem >
                        <Profile/> 
                    </CNavItem>
                    <CNavItem>
                        <LoginButton/>
                    </CNavItem>
                    <CNavItem >
                        <LogoutButton/>  
                    </CNavItem>
                    
                </CNavbarNav>
                </CCollapse>
                
            </CContainer>
        </CNavbar>
    );
};

export default NavBar;