"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
class Store {
    constructor() {
        this.data = [];
    }
    static getInstance() {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }
    addData(data) {
        this.data.push(data);
    }
    getLastData() {
        if (this.data.length === 0) {
            return null;
        }
        return this.data[this.data.length - 1];
    }
    getAllData() {
        return [...this.data];
    }
}
exports.Store = Store;
