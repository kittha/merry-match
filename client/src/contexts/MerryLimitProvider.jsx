import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; 
import useAuth from '../hooks/useAuth';
import axios from 'axios';

export const MerryLimitContext = React.createContext(null);

/**
 * MerryLimitProvider is a React component that provides Merry limit data to its child components.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components.
 * @return {ReactNode} The MerryLimitContext.Provider component with the Merry limit data.
 */
export function MerryLimitProvider({ children }) {
    // const maxDailyQuotaDefaultValue = 20;
    const { state } = useAuth();
    const [userId] = useState(() => {
        return state?.user?.id || JSON.parse(localStorage.getItem('data'))?.id;
    });
    const [availableClicksToday, setAvailableClicksToday] = useState(0);
    const [maxDailyQuota, setMaxDailyQuota] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            if (!userId) return;
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const [availableClicksResponse, maxDailyQuotaResponse] = await Promise.all([
                    axios.get(`${backendUrl}/api/v1/merry/available-clicks/${userId}`),
                    axios.get(`${backendUrl}/api/v1/merry/merry-limit/${userId}`)
                ]);

                setAvailableClicksToday(availableClicksResponse?.data?.data?.availableClicksToday ?? 0);
                setMaxDailyQuota(maxDailyQuotaResponse?.data?.data?.merry_limit ?? null);
            } catch (error) {
                // console.error('Error fetching Merry limit data:', error);
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

MerryLimitProvider.propTypes = {
  children: PropTypes.node.isRequired
};
