export function getBreakdownsPayload(body) {
    return Array.isArray(body) ? body : body.breakdowns;
}

export function getImportSource(body) {
    return body.source || '1C HTTP';
}

export function isBreakdownsPayload(value) {
    return Array.isArray(value);
}
