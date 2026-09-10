import { useEffect } from 'react';

export function usePolling(callback, intervalMs) {
    useEffect(
        () => createPollingSubscription(callback, intervalMs),
        [callback, intervalMs],
    );
}

function createPollingSubscription(callback, intervalMs) {
    const polling = createPollingController(callback, intervalMs);
    polling.start();
    return polling.stop;
}

function createPollingController(callback, intervalMs) {
    let timeoutId;
    let isActive = true;

    return {
        start: () => runPolling(),
        stop: () => stopPolling(),
    };

    async function runPolling() {
        await callback();
        scheduleNextRun();
    }

    function scheduleNextRun() {
        if (isActive) {
            timeoutId = setTimeout(runPolling, intervalMs);
        }
    }

    function stopPolling() {
        isActive = false;
        clearTimeout(timeoutId);
    }
}