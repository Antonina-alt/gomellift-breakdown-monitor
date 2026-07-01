import { env } from '../config/env.js';

export function importApiKeyGuard(req, res, next) {
    if (isValidApiKey(req)) {
        return next();
    }

    return res.status(401).json({ message: 'Unauthorized' });
}

function isValidApiKey(req) {
    return req.header('x-api-key') === env.importApiKey;
}
