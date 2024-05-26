import { DataModel } from '../models/dataModel';

export class Store {
    private static instance: Store;
    private data: DataModel[];

    private constructor() {
        this.data = [];
    }

    public static getInstance(): Store {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    public addData(data: DataModel): void {
        this.data.push(data);
    }

    public getLastData(): DataModel | null {
        if (this.data.length === 0) {
            return null;
        }
        return this.data[this.data.length - 1];
    }

    public getAllData(): DataModel[] {
        return [...this.data];
    }
}
