import { supabase } from '../db/supabaseClient.js';
import { BREAKDOWN_COLUMNS } from '../constants/database.js';

export async function upsertBreakdowns(rows) {
    if (!rows.length) {
        return;
    }

    return throwOnError(await breakdowns().upsert(rows, { onConflict: 'request_number' }));
}

export async function getBreakdownsByBatchId(batchId) {
    return getMany(await breakdowns().select(BREAKDOWN_COLUMNS).eq('import_batch_id', batchId).order('request_number', { ascending: true }));
}

function breakdowns() {
    return supabase.from('elevator_breakdowns');
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
