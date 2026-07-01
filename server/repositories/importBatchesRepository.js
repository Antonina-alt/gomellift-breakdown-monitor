import { supabase } from '../db/supabaseClient.js';

export async function createImportBatch(sourceName) {
    return getSingle(await importBatches().insert(createProcessingBatch(sourceName)).select('id').single());
}

export async function markBatchAsSuccess(batchId, recordsCount) {
    return throwOnError(await updateBatch(batchId, { status: 'success', records_count: recordsCount }));
}

export async function markBatchAsFailed(batchId, error) {
    return throwOnError(await updateBatch(batchId, { status: 'failed', error_message: error.message }));
}

export async function getLatestSuccessfulBatch() {
    const result = await importBatches().select('id, imported_at, records_count').eq('status', 'success').order('imported_at', { ascending: false }).limit(1);
    return getMany(result)[0];
}

function createProcessingBatch(sourceName) {
    return { source_file: sourceName, records_count: 0, status: 'processing' };
}

function updateBatch(batchId, changes) {
    return importBatches().update(changes).eq('id', batchId);
}

function importBatches() {
    return supabase.from('import_batches');
}

function getSingle(result) {
    throwOnError(result);
    return result.data;
}

function getMany(result) {
    throwOnError(result);
    return result.data;
}

function throwOnError({ error }) {
    if (error) {
        throw error;
    }
}
