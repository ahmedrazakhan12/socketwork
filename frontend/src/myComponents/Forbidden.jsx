// TokenTampered.js

import React from 'react';
import './forbidden.css';

const Forbidden = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

            <div className="container">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ff5252" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <h1>Token Tampered!</h1>
                <p>We Detected Your Credentials has been tampered with. Please contact the administrator for assistance.</p>
                <a href="mailto:admin@example.com">Contact Administrator</a>
            </div>
        </div>
    );
};

export default Forbidden;
