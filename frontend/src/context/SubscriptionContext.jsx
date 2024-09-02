
import React, { createContext, useContext, useState } from 'react';



const SubscriptionContext = createContext();
export const SubscriptionProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [skillsData, setSkillsData] = useState([]);
    const [isLoadsing, setIsLoading] = useState(false);
    const [progresss, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isPreLoading, setIsPreLoading] = useState(false);


    const [duration, setDuration] = useState(null);
    const [newAmount, setNewAmount] = useState(null);

    // const options = authUser.skills.map(skill => ({
    //     value: skill.id,
    //     label: skill.name
    // }));



    return (
        <SubscriptionContext.Provider
            value={{
                skillsData,
                loading,
                duration,
                setDuration,
                newAmount,
                setNewAmount,
                // options
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};
export const useSubscriptionContext = () => useContext(SubscriptionContext);



