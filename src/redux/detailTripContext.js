import { createContext, useState } from "react";

export const DetailTripContext = createContext();

const DetailTripProvider = ({ children }) => {
    const [detailTrip, setDetailTrip] = useState({
        duration: '',
        distance: '',
        price_distance: 0,
    });
    const value = {
        detailTrip,
        setDetailTrip,
    };
    return <DetailTripContext.Provider value={value}>{children}</DetailTripContext.Provider>;
};

export default DetailTripProvider;
