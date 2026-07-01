import 'dotenv/config';
import { getRequiredEnv } from '../utils/requiredEnv.js';

export const env = {
    port: process.env.PORT || 4000,
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    supabaseUrl: getRequiredEnv('SUPABASE_URL'),
    supabaseServiceRoleKey: getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY'),
    importApiKey: getRequiredEnv('IMPORT_API_KEY'),
};
