import json
import logging
import paho.mqtt.client as mqtt
from anomaly_detection import detect_anomaly

def on_message(client, userdata, msg):
    try:
        data = json.loads(msg.payload.decode())
        logging.info(f"Received data: {data}")
        
        anomaly_detected = detect_anomaly(data)
        
        if anomaly_detected:
            anomaly_type, anomaly_details = anomaly_detected.split(": ", 1)
            anomaly_data = {
                "type": "anomaly",
                "sensor_data": data,
                "details": anomaly_details.strip()  
            }
            location = f"sensor/anomaly/{anomaly_type.strip()}"  
            client.publish(location, json.dumps(anomaly_data))
            logging.info("Anomaly detected and published.")
        else:
            client.publish("sensor/last", json.dumps(data))
            logging.info("Published data to the sensor/last topic.")


    except json.JSONDecodeError as e:
        logging.error(f"Failed to decode JSON: {e}")
    except Exception as e:
        logging.error(f"An error occurred: {e}")


def setup_mqtt_client(broker_address, data_topic):
    client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
    client.on_message = on_message
    
    try:
        client.connect(broker_address)
        logging.info(f"Connected to MQTT broker at {broker_address}")
    except Exception as e:
        logging.error(f"Failed to connect to MQTT broker: {e}")
        raise
    client.subscribe(data_topic)
    logging.info(f"Subscribed to topic: {data_topic}")
    
    return client
