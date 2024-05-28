import { Request, Response, NextFunction } from 'express';
import mqttService from '../services/mqttService';
import { Store } from '../store/store';

const store = Store.getInstance();

export const getData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await store.getAllData();
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const getLastData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lastData = await store.getLastData();
        if (lastData) {
            res.json(lastData);
        } else {
            res.status(404).json({ message: 'No data found' });
        }
    } catch (error) {
        next(error);
    }
};
