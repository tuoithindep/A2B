import { useEffect } from 'react';

const useInterval = (callback, delay, enabled = true) => {
    useEffect(() => {
        if (!enabled) return;
        const interval = setInterval(callback, delay);

        return () => clearInterval(interval);
    }, [callback, delay, enabled]);
};
export default useInterval;
