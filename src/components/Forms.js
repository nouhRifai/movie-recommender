import React from 'react';
import { CForm,CRow,CCol } from '@coreui/react';
import FormRecommandationContenu from './FormRecommandationContenu';
import FormRecommandationColaborativeFiltering from './FormRecommandationColaborativeFiltering';
const Forms = () => {
    return (
        <>
                <CRow>
                    <CCol sm={12} md={6}>
                        <CForm className="form">
                            <FormRecommandationColaborativeFiltering/>
                        </CForm>
                    </CCol>
                    <CCol sm={12} md={6}>
                        <CForm className="form">
                            <FormRecommandationContenu/>
                        </CForm>                        
                    </CCol>
                </CRow>
        </>
    );
};

export default Forms;