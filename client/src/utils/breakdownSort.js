export function getRequestNumberSortValue(requestNumber) {
    const match = String(requestNumber).match(/\d+$/);

    return match ? Number(match[0]) : requestNumber;
}

export function getDowntimeSortValue(row) {
    return row.downtimeMinutes || 0;
}
