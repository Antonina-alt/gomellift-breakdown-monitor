import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import breakdownsRoutes from './routes/breakdownsRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json({ limit: '10mb' }));
app.use('/api/breakdowns', breakdownsRoutes);
app.use(errorHandler);

app.listen(env.port, () => {
    console.log(`Server is running on http://localhost:${env.port}`);
});
