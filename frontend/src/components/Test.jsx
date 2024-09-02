import React, { useState } from 'react';

function Test() {
    const [cardNumber, setCardNumber] = useState('');

    const handleCardNumberChange = (event) => {
        const input = event.target.value;
        const formattedInputBy4Pairs = input
            .replace(/\s/g, '') // Remove existing spaces
            .replace(/\D/g, '') // Remove non-numeric characters
            .slice(0, 16) // Limit input to 16 characters
            .replace(/(\d{4})/g, '$1 ') // Add space after every 4 digits
            .trim(); // Remove leading/trailing spaces

        setCardNumber(formattedInputBy4Pairs);
    };
    return (
        <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="Enter card number"
        />
    );
}

export default Test;