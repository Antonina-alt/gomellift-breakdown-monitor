import { API_BASE_URL } from '../config/api.js';

export async function getJson(path) {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
    }

    return response.json();
}
