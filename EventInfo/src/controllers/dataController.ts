import { Request, Response, NextFunction } from 'express';
import mqttService from '../services/mqttService';
import { Store } from '../store/store';
import { DataModel } from '../models/dataModel';

const store = Store.getInstance();

export const getData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await store.getAllData(); 
        res.json(data);
    } catch (error) {
        next(error);
    }
    return;
};



export const getLastDataByPlantId = async (req: any, res: Response, next: NextFunction): Promise<DataModel | null> => {
    try {
        const plantId = parseInt(req.params.plantId);
        const lastData = store.getLastDataByPlantId(plantId);
        if (lastData) {
            res.json(lastData);
            return lastData;
        } else {
            res.status(404).json({ message: 'No data found' });
            return null;
        }
    } catch (error) {
        next(error);
        throw error; 
    }
};


export const getDataByPlantId = async (req: Request, res: Response, next: NextFunction): Promise<DataModel[] | undefined> => {
    try {
        const plantId = req.params.PLANT_ID; 
        const data = await store.getDataByPlantId(plantId); 
        res.json(data);
        return data;
    } catch (error) {
        next(error);
    }
};

