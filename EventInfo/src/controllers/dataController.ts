import { Request, Response } from 'express';
import mqttService from '../services/mqttService';

export const getData = (req: Request, res: Response) => {
    res.json(mqttService.getData());
};
