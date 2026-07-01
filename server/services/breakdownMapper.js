const API_FIELDS = [
    ['requestNumber', 'request_number'],
    ['lift', 'lift'],
    ['inventoryNumber', 'inventory_number'],
    ['stopTime', 'stopped_at_text'],
    ['downtime', 'downtime_text'],
    ['downtimeMinutes', 'downtime_minutes'],
    ['estimatedStartDate', 'estimated_start_text'],
    ['fault', 'fault'],
];

export function mapDatabaseRowToApiResponse(row) {
    return Object.fromEntries(API_FIELDS.map(([apiField, dbField]) => [apiField, row[dbField]]));
}
