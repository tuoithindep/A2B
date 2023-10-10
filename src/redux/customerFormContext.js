import { format } from 'date-fns';
import React, { createContext, useState } from 'react';

export const CustomerFormContext = createContext();

const CustomerFormProvider = ({ children }) => {
    const [customerForm, setCustomerForm] = useState({
        tripId: '',
        startPoint: '',
        endPoint: '',
        typeCar: '',
        nameCar: '',
        startTime: '',
        comment: '',
        duration: '',
        distance: '',
        coordinates: '',
        price: '',
    });
    const value = {
        customerForm,
        setCustomerForm,
    };
    return <CustomerFormContext.Provider value={value}>{children}</CustomerFormContext.Provider>;
};

export default CustomerFormProvider;
