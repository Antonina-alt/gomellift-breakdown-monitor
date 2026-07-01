import { getJson } from './httpClient.js';

export function getBreakdowns() {
    return getJson('/api/breakdowns');
}
