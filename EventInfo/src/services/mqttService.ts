require('dotenv').config();
import mqtt from 'mqtt';
import { DataModel } from '../models/dataModel';
import { Store } from '../store/store';

export class MQTTService {
  private client: mqtt.MqttClient;
  private data: DataModel;
  store: Store = Store.getInstance();


  constructor() {
    const brokerAddress = process.env.MQTT_BROKER_HOST || 'localhost';
    //this.client = mqtt.connect(`my-mqtt-broker:${process.env.MQTT_BROKER_PORT}`);
    this.client = mqtt.connect(`mqtt://my-mqtt-broker:1883`);
    this.data = {
      PLANT_ID: 0,
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
      } else if (topic.startsWith('sensor/anomaly/')) {
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

  private subscribeToTopics(): void {
    const topics = ['sensor/anomaly/+', 'sensor/last'];
    topics.forEach((topic) => {
        this.client.subscribe(topic, (err) => {
            if (err) {
                console.error(`Failed to subscribe to topic ${topic}:`, err);
            } else {
                console.log(`Subscribed to topic ${topic}`);
            }
        });
    });
}

  handleSensorData(data: DataModel) {
    this.store.addData(data);
  }

  handleAnomalyData(data: DataModel) {
    this.store.addData(data);
    this.alertUser(data);
  }

  alertUser(data: any) {
    console.log('Alerting user about anomaly:', data);
  }


  public getData(): DataModel {
    return this.data;
  }
}

export default new MQTTService();
