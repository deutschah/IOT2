import { Router } from 'express';
import { getData, getLastDataByPlantId,getDataByPlantId } from '../controllers/dataController';

const router = Router();

router.get('/data', getData);

router.get('/data/:plantId', getDataByPlantId);

router.get('/last/:plantId', getLastDataByPlantId);


export default router;


