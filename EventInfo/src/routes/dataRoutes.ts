import { Router } from 'express';
import { getData, getLastData } from '../controllers/dataController';

const router = Router();

router.get('/data', getData);

router.get('/last', getLastData);


export default router;
