const LANGUAGE_OPTIONS = {
    search: 'Поиск:',
    lengthMenu: 'Показать _MENU_ записей',
    info: 'Показано с _START_ по _END_ из _TOTAL_ записей',
    infoEmpty: 'Нет записей для отображения',
    infoFiltered: '(отфильтровано из _MAX_ записей)',
    zeroRecords: 'Совпадений не найдено',
    emptyTable: 'Нет данных',
    paginate: { first: '«', previous: '‹', next: '›', last: '»' },
};

export const breakdownsTableOptions = {
    responsive: true,
    pageLength: 10,
    lengthMenu: [5, 10, 25, 50],
    order: [[4, 'desc']],
    drawCallback: updateRowNumbers,
    columnDefs: createColumnDefs(),
    language: LANGUAGE_OPTIONS,
};

function updateRowNumbers() {
    const api = this.api();
    const pageInfo = api.page.info();

    getNumberColumn(api).each((cell, index) => {
        cell.innerHTML = pageInfo.start + index + 1;
    });
}

function getNumberColumn(api) {
    return api.column(0, { page: 'current', search: 'applied', order: 'applied' }).nodes();
}

function createColumnDefs() {
    return [createAllColumnsDef(), createNumberColumnDef(), createRequestColumnDef()];
}

function createAllColumnsDef() {
    return { targets: '_all', className: 'text-start' };
}

function createNumberColumnDef() {
    return { targets: 0, orderable: false, searchable: false };
}

function createRequestColumnDef() {
    return { targets: 1, orderable: true };
}
