import mqtt from 'mqtt';
import { DataModel } from '../models/dataModel';
import Queue from 'queue'
import { Store } from '../store/store';

export class MQTTService {
    private client: mqtt.MqttClient;
    private data: DataModel;
    store:Store=Store.getInstance();
    constructor() {
        this.client = mqtt.connect('mqtt://localhost');

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
            } else if (topic === 'sensor/anomaly/measurement_error') {
              this.handleAnomalyData(data);
            }
            else if (topic === 'sensor/anomaly/situational_anomaly') {
                this.handleAnomalyData(data);
              }
        });
    }

    handleSensorData(data:any) {
       this.store.addData(data);
       console.log('Added to queue:', data);
      }
    
      handleAnomalyData(data:any) {
        this.store.addData(data);
        this.alertUser(data);
        console.log('Anomaly detected and added to queue:', data);
      }
    
      alertUser(data:any) {
        console.log('Alerting user about anomaly:', data);
      }


    public getData(): DataModel {
        return this.data;
    }
}

export default new MQTTService();
