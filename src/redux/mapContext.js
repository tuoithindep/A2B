import React, { createContext, useState } from 'react';

export const MapContext = createContext();
const MapProvider = ({ children }) => {
  const [map, setMap] = useState({
    start: '',
    end:''
  });
  const value = {
    map,
    setMap,
  };
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};
export default MapProvider