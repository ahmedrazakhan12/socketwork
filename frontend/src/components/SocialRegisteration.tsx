import React from 'react'
import { useAppContext } from '../context/AppContext';

export default function SocialRegisteration() {
    const {
        userData,
        handleInputChange,
        validationErrors,
        user_type,
        handleUserTypeChange,
        handleSubmit,
        isLoading,
        userNavigation,
        setUserNavigation,
        setPhone,
        phone
    } = useAppContext();
    return (
        <>social registeraitno
        </>
    )
}
