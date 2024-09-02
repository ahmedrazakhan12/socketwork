import React from 'react';

const PaymentFailed = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>

            <div style={containerStyle}>
                <div style={iconStyle}>!</div>
                <h1 style={titleStyle}>Payment Failed</h1>
                <p style={textStyle}>Unfortunately, your payment was not successful. Please try again or contact customer support for assistance.</p>
                <a href="#" style={buttonStyle}>Try Again</a>
                <div style={noteStyle}>
                    <p><strong>Note:</strong> If you continue to experience issues with your payment, please contact our support team for further assistance.</p>
                </div>
                <div style={contactInfoStyle}>
                    <h5>Contact Information</h5>
                    <p><strong>Email:</strong> support@example.com</p>
                    <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                </div>
            </div>
        </div>
    );
};

const containerStyle = {
    textAlign: 'center',
    padding: '40px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    color: '#4d3a8e',
    maxWidth: '600px',
    width: '100%',
};

const iconStyle = {
    fontSize: '64px',
    color: '#ff3860',
    marginBottom: '20px',
};

const titleStyle = {
    color: '#4d3a8e',
    fontSize: '32px',
    marginBottom: '20px',
};

const textStyle = {
    color: '#666',
    marginTop: '20px',
    fontSize: '18px',
    lineHeight: '1.5',
};

const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#ff3860',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    marginTop: '20px',
    transition: 'background-color 0.3s',
};

const noteStyle = {
    color: '#888',
    fontSize: '14px',
    marginTop: '30px',
    textAlign: 'left',
};

const contactInfoStyle = {
    marginTop: '30px',
    textAlign: 'left',
};

export default PaymentFailed;