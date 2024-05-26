import { Request, Response } from 'express';
import mqttService from '../services/mqttService';
import { Store } from '../store/store';

export const getData = (req: Request, res: Response) => {
    res.json(Store.getInstance().getAllData());
};

export const getLastData = (req: Request, res: Response) => {
    const lastData = Store.getInstance().getLastData();
    if (lastData) {
        res.json(lastData);
    } else {
        res.status(404).json({ message: 'No data found' });
    }
};

