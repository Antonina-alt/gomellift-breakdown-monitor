import { useCallback, useEffect, useState } from 'react';
import { getBreakdowns } from '../api/breakdownsApi.js';
import { REFRESH_INTERVAL_MS } from '../config/api.js';
import { formatDateTime } from '../utils/dateTime.js';

export function useBreakdowns() {
    const [state, setState] = useState(createInitialState());
    const loadBreakdowns = useCallback(() => fetchBreakdowns(setState), []);

    useEffect(() => createBreakdownsSubscription(loadBreakdowns), [loadBreakdowns]);

    return state;
}

function createInitialState() {
    return { breakdowns: [], lastUpdated: '-', error: '' };
}

async function fetchBreakdowns(setState) {
    try {
        setState(await createSuccessState());
    } catch (error) {
        console.error(error);
        setState((state) => ({ ...state, error: 'Не удалось загрузить данные с сервера' }));
    }
}

async function createSuccessState() {
    return {
        breakdowns: await getBreakdowns(),
        lastUpdated: formatDateTime(new Date()),
        error: '',
    };
}

function createBreakdownsSubscription(loadBreakdowns) {
    loadBreakdowns();
    const intervalId = setInterval(loadBreakdowns, REFRESH_INTERVAL_MS);

    return () => clearInterval(intervalId);
}
