import express from 'express';
import dataRoutes from './routes/dataRoutes';

const app = express();

app.use('/api', dataRoutes);

export default app;
