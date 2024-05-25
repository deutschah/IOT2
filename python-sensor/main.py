import logging
import time
import json
import os
from pymongo import MongoClient
from pymongo.errors import PyMongoError
import paho.mqtt.client as mqtt

# Load configuration from file
def load_config(file_path='config.json'):
    with open(file_path, 'r') as file:
        config = json.load(file)
    return config

# Configure logging
logging.basicConfig(level=logging.INFO)

def connect_to_mongodb(mongo_uri):
    try:
        client = MongoClient(mongo_uri)
        #logging.info("Connected to MongoDB.")
        return client
    except PyMongoError as e:
        logging.error(f"Error connecting to MongoDB: {e}")
        raise

def connect_to_mqtt_broker(broker_address, broker_port):
    try:
        mqtt_client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
        mqtt_client.connect(broker_address, broker_port, 60)
        #logging.info("Connected to MQTT broker.")
        return mqtt_client
    except ConnectionRefusedError as e:
        logging.error(f"Error connecting to MQTT broker: {e}")
        raise

def publish_sensor_data(config):
    client = connect_to_mongodb(config['MONGO_URI'])
    db = client[config['DB_NAME']]
    collection = db[config['COLLECTION_NAME']]
    mqtt_client = connect_to_mqtt_broker(config['BROKER_ADDRESS'], config['BROKER_PORT'])

    last_id = None

    while True:
        try:
            if last_id:
                query = {'_id': {'$gt': last_id}}
            else:
                query = {}

            item = collection.find_one(query, sort=[('_id', 1)])  
            if item:
                last_id = item['_id']
                item['_id'] = str(item['_id'])  
                json_data = json.dumps(item)
                mqtt_client.publish(config['TOPIC'], json_data)
                logging.info(f"Published sensor data to topic: {config['TOPIC']}")
            else:
                logging.info("No new data found in the collection.")
            time.sleep(config['INTERVAL'])
        except (PyMongoError, ConnectionRefusedError, OSError) as e:
            logging.error(f"Error during data retrieval or publishing: {e}")
            time.sleep(config['INTERVAL']) 

if __name__ == "__main__":
    config = load_config()
    logging.info("Sensor microservice started...")
    publish_sensor_data(config)
