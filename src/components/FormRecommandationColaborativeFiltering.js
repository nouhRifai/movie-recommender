
import React from 'react';
import { CCol, CButton, CRow, CContainer } from '@coreui/react';
import { useAuth0 } from '@auth0/auth0-react';
const FormRecommandationColaborativeFiltering = () => {
    const {isAuthenticated} = useAuth0();
    return (
        <>
        <CContainer className='container-form'>
            <CRow className='row-form'>
                <h5>Recommandation based on users preferences</h5>
                <hr/>
                {!isAuthenticated 
                    ? (<span className='text'>(You need to login!)</span>)
                    : (<span className='text'>(You have rated {} movies so far!)</span>)
                }
                <CCol xs={12} className='place_end'>
                    <CButton color='dark' className='submit' disabled={!isAuthenticated}>Rate Movies</CButton>
                </CCol>
                <hr/>

                <CCol xs={12} className='place_end'>
                    <CButton color='dark' className='submit' disabled={!isAuthenticated}>Recommand</CButton>
                    
                </CCol>
                <CCol xs={12} className='place_end'>
                    
                    <CButton color='dark' className='submit' disabled={!isAuthenticated}>M-Recommand</CButton>
                </CCol>
            </CRow>  
        </CContainer>
        </>
    );
};

export default FormRecommandationColaborativeFiltering;