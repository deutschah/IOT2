import express from 'express';
import dataRoutes from './routes/dataRoutes';
import mqttService from './services/mqttService';
import removeIdFromResponses from './middleware/middleware';

const app = express();

app.use('/api', removeIdFromResponses,dataRoutes);
app.use(removeIdFromResponses);


export default app;
