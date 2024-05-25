
import logging
import json
from mqtt_handler import setup_mqtt_client

def load_config(file_path='config.json'):
    with open(file_path, 'r') as file:
        config = json.load(file)
    return config

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

if __name__ == "__main__":
    config = load_config()
    
    broker_address = config['broker_address']
    data_topic = config['data_topic']
    anomaly_topic = config['anomaly_topic']

    client = setup_mqtt_client(broker_address, data_topic)
    
    logging.info("Analytics microservice started...")
    client.loop_forever()
