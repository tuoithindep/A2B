// NotificationContext.js
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [countNoti, setCountNoti] = useState(0);

    const handleHiddenNoti = (count) => {
        setCountNoti(count);
    };

    return (
        <NotificationContext.Provider value={{ countNoti, handleHiddenNoti }}>
            {children}
        </NotificationContext.Provider>
    );
};
