import React from 'react';
import loader from '../assets/svg/Spin-1s-200px.svg';

const LoaderPre = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7f7f7', // Background color
      opacity: '0.9', // Opacity for a semi-transparent effect
    }}>
      <img
        src={loader}
        alt="Loading..."
        style={{
          width: '100px', // Adjust the width of the loader image
          height: '100px', // Adjust the height of the loader image
        }}
      />
    </div>
  );
};

export default LoaderPre;
