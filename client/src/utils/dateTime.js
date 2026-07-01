export function formatDateTime(date) {
    return date.toLocaleString('ru-RU', {
        dateStyle: 'short',
        timeStyle: 'medium',
    });
}
