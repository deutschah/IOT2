"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQTTService = void 0;
require('dotenv').config();
const mqtt_1 = __importDefault(require("mqtt"));
const store_1 = require("../store/store");
class MQTTService {
    constructor() {
        this.store = store_1.Store.getInstance();
        const brokerAddress = process.env.MQTT_BROKER_HOST || 'localhost';
        this.client = mqtt_1.default.connect(`mqtt://${brokerAddress}`);
        this.data = {
            AC_POWER: 0,
            DC_POWER: 0,
            TOTAL_YIELD: 0,
            DAILY_YIELD: 0
        };
        this.client.subscribe('sensor/+', (err) => {
            if (!err) {
                console.log('Subscribed to all sensor topics');
            }
        });
        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            this.client.subscribe('detectedData', (err) => {
                if (!err) {
                    console.log('Subscribed to topic');
                }
            });
        });
        this.client.on('message', (topic, message) => {
            const data = JSON.parse(message.toString());
            if (topic === 'sensor/last') {
                this.handleSensorData(data);
            }
            else if (topic === 'sensor/anomaly/measurement_error') {
                this.handleAnomalyData(data);
            }
            else if (topic === 'sensor/anomaly/situational_anomaly') {
                this.handleAnomalyData(data);
            }
        });
    }
    handleSensorData(data) {
        this.store.addData(data);
        console.log('Added to queue:', data);
    }
    handleAnomalyData(data) {
        this.store.addData(data);
        this.alertUser(data);
        console.log('Anomaly detected and added to queue:', data);
    }
    alertUser(data) {
        console.log('Alerting user about anomaly:', data);
    }
    getData() {
        return this.data;
    }
}
exports.MQTTService = MQTTService;
exports.default = new MQTTService();
