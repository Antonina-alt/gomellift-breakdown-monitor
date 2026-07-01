const FIELD_KEYS = {
    requestNumber: ['requestNumber', 'request_number', 'номер заявки', 'Номер заявки', 'заявка', 'Заявка'],
    lift: ['lift', 'лифт', 'Лифт'],
    inventoryNumber: ['inventoryNumber', 'inventory_number', 'инвентарный номер', 'Инвентарный номер', 'Инв. номер', 'инв. номер'],
    stoppedAtText: ['stopTime', 'stoppedAt', 'stopped_at', 'время остановки', 'Время остановки'],
    downtimeText: ['downtime', 'downtimeText', 'downtime_text', 'время простоя', 'Время простоя'],
    estimatedStartText: ['estimatedStartDate', 'estimated_start_date', 'estimated_start_text', 'ориентировочная дата пуска', 'Ориентировочная дата пуска'],
    fault: ['fault', 'неисправность', 'Неисправность', 'description', 'Описание'],
};

const DATABASE_FIELDS = [
    ['request_number', 'requestNumber'],
    ['lift', 'lift'],
    ['inventory_number', 'inventoryNumber'],
    ['stopped_at_text', 'stoppedAtText'],
    ['downtime_text', 'downtimeText'],
    ['estimated_start_text', 'estimatedStartText'],
    ['fault', 'fault'],
];

export function normalizeBreakdown(rawBreakdown, importBatchId) {
    const breakdown = getNormalizedFields(rawBreakdown);

    return {
        ...mapDatabaseFields(breakdown),
        downtime_minutes: getDowntimeMinutes(breakdown.downtimeText),
        source_payload: rawBreakdown,
        import_batch_id: importBatchId,
        imported_at: new Date().toISOString(),
    };
}

export function getDowntimeMinutes(downtime) {
    if (typeof downtime === 'number') {
        return downtime;
    }

    return getHours(downtime) * 60 + getMinutes(downtime);
}

function mapDatabaseFields(breakdown) {
    return Object.fromEntries(DATABASE_FIELDS.map(([dbField, field]) => [dbField, breakdown[field]]));
}

function getNormalizedFields(source) {
    return Object.fromEntries(Object.entries(FIELD_KEYS).map(([field, keys]) => [field, getStringValue(source, keys)]));
}

function getStringValue(source, keys) {
    return String(pickValue(source, keys)).trim();
}

function pickValue(source, keys) {
    const key = keys.find((item) => source[item] !== undefined && source[item] !== null);

    return key ? source[key] : '';
}

function getHours(downtime) {
    return getTimePart(downtime, /(\d+)\s*(ч|час)/);
}

function getMinutes(downtime) {
    return getTimePart(downtime, /(\d+)\s*(мин|м)/);
}

function getTimePart(downtime, pattern) {
    const match = String(downtime).toLowerCase().match(pattern);
    return match ? Number(match[1]) : 0;
}
