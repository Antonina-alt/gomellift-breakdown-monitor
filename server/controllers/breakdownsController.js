import { getBreakdownsPayload, getImportSource, isBreakdownsPayload } from '../utils/requestBody.js';
import { getCurrentBreakdowns, importBreakdownsFromHttp } from '../services/breakdownsService.js';

export async function getBreakdowns(_req, res) {
    res.json(await getCurrentBreakdowns());
}

export async function importBreakdowns(req, res) {
    const rawBreakdowns = getBreakdownsPayload(req.body);

    if (!isBreakdownsPayload(rawBreakdowns)) {
        return sendInvalidImportPayload(res);
    }

    return sendImportResult(res, await importBreakdownsFromHttp(rawBreakdowns, getImportSource(req.body)));
}

function sendInvalidImportPayload(res) {
    return res.status(400).json({ message: 'Request body must be an array or { breakdowns: [] }' });
}

function sendImportResult(res, result) {
    return res.json({ message: 'Import completed successfully', ...result });
}
