import React, { useEffect, useState } from 'react';
import { useAuth } from './authentication.jsx';
import axios from 'axios';

const MerryLimitContext = React.createContext(null);

/**
 * MerryLimitProvider is a React component that provides Merry limit data to its child components.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components.
 * @return {ReactNode} The MerryLimitContext.Provider component with the Merry limit data.
 */
function MerryLimitProvider({ children }) {
    const { state } = useAuth();
    const [userId, setUserId] = useState(() => {
        return state?.user?.id || JSON.parse(localStorage.getItem('data'))?.id;
    });
    const [availableClicksToday, setAvailableClicksToday] = useState(0);
    const [maxDailyQuota, setMaxDailyQuota] = useState(20);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;

            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const [availableClicksResponse, maxDailyQuotaResponse] = await Promise.all([
                    axios.get(`${backendUrl}/api/v1/merry/available-clicks/${userId}`),
                    axios.get(`${backendUrl}/api/v1/merry/merry-limit/${userId}`)
                ]);

                setAvailableClicksToday(availableClicksResponse.data.data.availableClicksToday);
                setMaxDailyQuota(maxDailyQuotaResponse.data.data.merry_limit);
            } catch (error) {
                console.error('Error fetching Merry limit data:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <MerryLimitContext.Provider value={{ availableClicksToday, setAvailableClicksToday, maxDailyQuota, setMaxDailyQuota }}>
            {children}
        </MerryLimitContext.Provider>
    );
}

const useMerryLimit = () => React.useContext(MerryLimitContext);
export { MerryLimitProvider, useMerryLimit };