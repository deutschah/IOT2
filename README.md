# IoT Project

This project consists of three microservices designed to work together to simulate a sensor, analyze data, and provide a REST API to access the analyzed data. The microservices communicate via MQTT and use MongoDB as the database.

## Microservices

### 1. Python-sensor
- **Description**: Simulates a sensor. Retrieves one object from a cloud-based MongoDB database and publishes that object to an MQTT broker.
- **Technology**: Python

### 2. Analytics
- **Description**: Listens to broker messages and analyzes data sent from the python-sensor microservice. The analyzed data is published back to the broker via two topics.
- **Technology**: Python

### 3. EventInfo (Node.js)
- **Description**: Receives data from the Analytics microservice via MQTT and provides a REST API to view the data.
- **Technology**: Node.js with TypeScript
- **Ports**: `8080`


## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/deutschah/IOT2.git
    cd your-repo
    ```

2. Build the Docker images:
    ```sh
    docker-compose build
    ```

3. Start the services:
    ```sh
    docker-compose up
    ```

## Usage

### Python-sensor
This service automatically starts and simulates a sensor, reading from the MongoDB database every 5 seconds.

### Analytics
This service automatically starts and listens for updates from the python-sensor microservice, processes the data, and sends the results to the EventInfo service via MQTT.

### EventInfo
This service automatically starts and provides a REST API to access the analyzed data. 
## Endpoints

- `GET /data`: Retrieves all analyzed data.
- `GET /data/:plantId`: Retrieves analyzed data for a specific plant ID.
- `GET /last/:plantId`: Retrieves the latest analyzed data for a specific plant ID.
 

## Stopping the Services

To stop the services, press `CTRL+C` in the terminal where you ran `docker-compose up`, or run:
```sh
docker-compose down
