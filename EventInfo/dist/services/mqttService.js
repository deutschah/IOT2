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
        //this.client = mqtt.connect(`my-mqtt-broker:${process.env.MQTT_BROKER_PORT}`);
        this.client = mqtt_1.default.connect(`mqtt://my-mqtt-broker:1883`);
        this.data = {
            AC_POWER: 0,
            DC_POWER: 0,
            TOTAL_YIELD: 0,
            DAILY_YIELD: 0
        };
        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            this.subscribeToTopics();
        });
        this.client.on('message', (topic, message) => {
            const data = JSON.parse(message.toString());
            if (topic === 'sensor/last') {
                this.handleSensorData(data);
            }
            else if (topic.startsWith('sensor/anomaly/')) {
                this.handleAnomalyData(data);
            }
        });
        this.client.on('error', (err) => {
            console.error('MQTT client error:', err);
        });
        this.client.on('offline', () => {
            console.warn('MQTT client is offline');
        });
        this.client.on('reconnect', () => {
            console.log('MQTT client is reconnecting');
        });
    }
    subscribeToTopics() {
        const topics = ['sensor/anomaly/+', 'sensor/last'];
        topics.forEach((topic) => {
            this.client.subscribe(topic, (err) => {
                if (err) {
                    console.error(`Failed to subscribe to topic ${topic}:`, err);
                }
                else {
                    console.log(`Subscribed to topic ${topic}`);
                }
            });
        });
    }
    handleSensorData(data) {
        this.store.addData(data);
    }
    handleAnomalyData(data) {
        this.store.addData(data);
        this.alertUser(data);
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
