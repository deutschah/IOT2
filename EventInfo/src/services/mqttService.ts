import mqtt from 'mqtt';
import { DataModel } from '../models/dataModel';

class MQTTService {
    private client: mqtt.MqttClient;
    private data: DataModel;

    constructor() {
        this.client = mqtt.connect('mqtt://localhost');
        this.data = {
            AC_POWER: 0,
            DC_POWER: 0,
            TOTAL_YIELD: 0,
            DAILY_YIELD: 0
        };

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            this.client.subscribe('detectedData', (err) => {
                if (!err) {
                    console.log('Subscribed to topic');
                }
            });
        });

        this.client.on('message', (topic, message) => {
            this.updateData(JSON.parse(message.toString()));
        });
    }

    private updateData(newData: Partial<DataModel>) {
        this.data = { ...this.data, ...newData };
    }

    public getData(): DataModel {
        return this.data;
    }
}

export default new MQTTService();
