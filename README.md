# IoT Project

This project consists of three microservices designed to work together to simulate a sensor, analyze data, and provide a REST API to access the analyzed data. The microservices communicate via MQTT and use MongoDB as the database.

## Microservices

### 1. Python-sensor
- **Description**: Simulates a sensor, triggering updates to a cloud MongoDB database every 5 seconds.
- **Technology**: Python

### 2. Analytics
- **Description**: Analyzes data from the MongoDB database and sends the results to the Node.js microservice via MQTT. 
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
- `GET /last`: Retrieves the latest analyzed data.
 

## Stopping the Services

To stop the services, press `CTRL+C` in the terminal where you ran `docker-compose up`, or run:
```sh
docker-compose down
