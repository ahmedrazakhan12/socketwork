// SocialAuthContext.js
import { GoogleOAuthProvider } from '@react-oauth/google';
import React, { createContext, useContext, useState } from 'react';
import { clientTestId } from '../utils/constants';

const SocialAuthContext = createContext();
const useSocialAuth = () => {
    return useContext(SocialAuthContext);
};

export { useSocialAuth };


export const SocialAuthProvider = ({ children }) => {
    const [socialUser, setSocialUser] = useState(null);
    const [Alert, setAlert] = useState(null);

    const login = (socialUserData) => {
        // Your login logic here
        setSocialUser(socialUserData);
    };

    const logout = () => {

        // Your logout logic here
        setSocialUser(null);
    };

    return (
        <GoogleOAuthProvider clientId={clientTestId}>
            <SocialAuthContext.Provider value={{ socialUser, login, logout, Alert, setAlert }}>
                {children}
            </SocialAuthContext.Provider>
        </GoogleOAuthProvider>
    );
};




 