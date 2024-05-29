import { DataModel } from '../models/dataModel';

export class Store {
    private static instance: Store;
    private data: { [key: string]: DataModel[] };

    private constructor() {
        this.data = {};
    }

    public static getInstance(): Store {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    public addData(data: DataModel): void {
        const plantId = data.PLANT_ID;
        if (!this.data[plantId]) {
            this.data[plantId] = [];
        }
        this.data[plantId].push(data);
    }

    public getLastDataByPlantId(plantId: number): DataModel | null {
        const dataForPlant = this.data[plantId];
        if (!dataForPlant || dataForPlant.length === 0) {
            return null;
        }
        return dataForPlant[dataForPlant.length - 1];
    }

    public getDataByPlantId(plantId: string): DataModel[] | undefined {
        return this.data[plantId];
    }

    public getAllData(): { [key: string]: DataModel[] } {
        return { ...this.data };
    }
}



