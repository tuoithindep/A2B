import { format } from 'date-fns';
import React, { createContext, useState } from 'react';

export const BookingFormContext = createContext();

const BookingFormProvider = ({ children }) => {
    const [bookingForm, setBookingForm] = useState({
        eniqueId: '',
        startPoint: '',
        endPoint: '',
        typeCar: '' || 1,
        nameCar: '' || 'Xe Sedan',
        departureTime: '' || format(new Date(), 'yyyy-MM-dd HH:mm'),
        note: '',
        isPunish: 0
    });
    const value = {
        bookingForm,
        setBookingForm,
    };
    return <BookingFormContext.Provider value={value}>{children}</BookingFormContext.Provider>;
};

export default BookingFormProvider;
