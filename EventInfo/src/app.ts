import express from 'express';
import dataRoutes from './routes/dataRoutes';
import mqttService from './services/mqttService';

const app = express();

app.use('/api', dataRoutes);


export default app;
