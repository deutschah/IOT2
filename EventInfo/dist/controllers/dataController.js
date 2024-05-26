"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastData = exports.getData = void 0;
const store_1 = require("../store/store");
const getData = (req, res) => {
    res.json(store_1.Store.getInstance().getAllData());
};
exports.getData = getData;
const getLastData = (req, res) => {
    const lastData = store_1.Store.getInstance().getLastData();
    if (lastData) {
        res.json(lastData);
    }
    else {
        res.status(404).json({ message: 'No data found' });
    }
};
exports.getLastData = getLastData;
