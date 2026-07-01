import { getBreakdownsByBatchId, upsertBreakdowns } from '../repositories/breakdownsRepository.js';
import { createImportBatch, getLatestSuccessfulBatch, markBatchAsFailed, markBatchAsSuccess } from '../repositories/importBatchesRepository.js';
import { mapDatabaseRowToApiResponse } from './breakdownMapper.js';
import { normalizeBreakdown } from './normalizeBreakdown.js';

export async function importBreakdownsFromHttp(rawBreakdowns, sourceName = '1C HTTP') {
    const batch = await createImportBatch(sourceName);

    try {
        return await importBreakdownsBatch(rawBreakdowns, batch.id);
    } catch (error) {
        await markBatchAsFailed(batch.id, error);
        throw error;
    }
}

export async function getCurrentBreakdowns() {
    const latestBatch = await getLatestSuccessfulBatch();

    if (!latestBatch) {
        return [];
    }

    return mapBreakdowns(await getBreakdownsByBatchId(latestBatch.id));
}

async function importBreakdownsBatch(rawBreakdowns, batchId) {
    const rowsToSave = prepareRows(rawBreakdowns, batchId);
    await upsertBreakdowns(rowsToSave);
    await markBatchAsSuccess(batchId, rowsToSave.length);
    return { batchId, count: rowsToSave.length };
}

function prepareRows(rawBreakdowns, batchId) {
    return removeDuplicates(rawBreakdowns.map((item) => normalizeBreakdown(item, batchId)).filter(isValidRow));
}

function isValidRow(row) {
    return row.request_number && row.lift;
}

function removeDuplicates(rows) {
    return Array.from(new Map(rows.map((row) => [row.request_number, row])).values());
}

function mapBreakdowns(rows) {
    return rows.map(mapDatabaseRowToApiResponse);
}
