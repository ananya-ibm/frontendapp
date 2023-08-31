import React from 'react'
import * as S from './Contactus.styles';
import { Link, withRouter,useHistory } from 'react-router-dom';
const ContactUs = (props) => {

    return(<S.Contactus>
        <div className='Contactus_Heading'>Contact Us</div>
        <div className='Contactus_Para'>Please fill in the form to submit your enquiry. A customer service representative
        will be in touch with you shortly. Alternatively, you can call the SHARE hotline at <span>+1(1800)2667211</span></div>
        </S.Contactus>)

}

export default withRouter(ContactUs)