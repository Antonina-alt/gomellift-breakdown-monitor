import { useCallback, useState } from 'react';
import { getBreakdowns } from '../api/breakdownsApi.js';
import { REFRESH_INTERVAL_MS } from '../config/api.js';
import { formatDateTime } from '../utils/dateTime.js';
import { usePolling } from './usePolling.js';

const LOAD_ERROR_MESSAGE = 'Не удалось загрузить данные с сервера';

export function useBreakdowns() {
    const [state, setState] = useState(createInitialState);

    const loadBreakdowns = useCallback(
        () => fetchBreakdowns(setState),
        [],
    );

    usePolling(loadBreakdowns, REFRESH_INTERVAL_MS);

    return state;
}

async function fetchBreakdowns(setState) {
    try {
        const response = await getBreakdowns();
        setState(createSuccessState(response));
    } catch (error) {
        handleLoadError(error, setState);
    }
}

function handleLoadError(error, setState) {
    console.error(error);

    setState((state) => ({
        ...state,
        loading: false,
        error: LOAD_ERROR_MESSAGE,
    }));
}

function createSuccessState(response) {
    return {
        breakdowns: response.breakdowns,
        lastUpdated: formatImportedAt(response.importedAt),
        loading: false,
        error: '',
    };
}

function formatImportedAt(importedAt) {
    return importedAt
        ? formatDateTime(new Date(importedAt))
        : '-';
}

function createInitialState() {
    return {
        breakdowns: [],
        lastUpdated: '-',
        loading: true,
        error: '',
    };
}