import React from 'react';
import Logo from '../../YNOTmedia.png';
import './Logo.css';


const logo = (props) => (
    <div className="logo" >
        <img src={Logo} alt="YNOT media" />
    </div>
);

export default logo;