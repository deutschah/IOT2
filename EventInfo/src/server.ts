import app from './app';
import { MQTTService } from './services/mqttService';

const PORT = process.env.PORT || 3000;

const mqtt = new MQTTService();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
