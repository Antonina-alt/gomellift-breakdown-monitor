import { getDowntimeSortValue, getRequestNumberSortValue } from '../../utils/breakdownSort.js';

export const breakdownsTableColumns = [
    createNumberColumn(),
    createRequestNumberColumn(),
    createColumn('Лифт', 'lift'),
    createColumn('Инв. номер', 'inventoryNumber'),
    createColumn('Время остановки', 'stopTime'),
    createDowntimeColumn(),
    createColumn('Ориентировочная дата пуска', 'estimatedStartDate'),
    createColumn('Неисправность', 'fault'),
];

function createNumberColumn() {
    return { title: '№', data: null, defaultContent: '', orderable: false, searchable: false, width: '60px' };
}

function createRequestNumberColumn() {
    return { title: 'Номер заявки', data: 'requestNumber', orderable: true, render: renderRequestNumber };
}

function createDowntimeColumn() {
    return { title: 'Время простоя', data: 'downtime', render: renderDowntime };
}

function createColumn(title, data) {
    return { title, data };
}

function renderRequestNumber(data, type) {
    return isSortRender(type) ? getRequestNumberSortValue(data) : data;
}

function renderDowntime(data, type, row) {
    return isSortRender(type) ? getDowntimeSortValue(row) : data;
}

function isSortRender(type) {
    return type === 'sort' || type === 'type';
}
