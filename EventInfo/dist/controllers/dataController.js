"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastData = exports.getData = void 0;
const store_1 = require("../store/store");
const store = store_1.Store.getInstance();
const getData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield store.getAllData();
        res.json(data);
        return data;
    }
    catch (error) {
        next(error);
    }
});
exports.getData = getData;
const getLastData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastData = yield store.getLastData();
        if (lastData) {
            res.json(lastData);
            return lastData;
        }
        else {
            res.status(404).json({ message: 'No data found' });
            return null;
        }
    }
    catch (error) {
        next(error);
        throw error;
    }
});
exports.getLastData = getLastData;
