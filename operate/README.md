# Zebee Node POC

This POC is heavily based off the [Zebee Getting Started Tutorial](https://docs.zeebe.io/getting-started/index.html) and is enhanced with the [zeebe-node](https://www.npmjs.com/package/zeebe-node) library.

This POC contains:
* [zb-initialiser](https://github.com/peadarkelly/zebee-poc/tree/master/operate/zb-initialiser) - An ExpressJS REST API Micoservice used to initiate a Zeebe Process
* [zb-initiate-payment](https://github.com/peadarkelly/zebee-poc/tree/master/operate/zb-initiate-payment) - A Typescript NodeJS example Worker microservice that reacts to a job event

## Prerequsites:
* The [Zebee Getting Started Tutorial](https://docs.zeebe.io/getting-started/index.html) has been completed, with the BPMN file being deployed to the Zeebe broker.

## To run:
```
docker-compose up --build -d
# wait for zeebe to start (zb-initialiser and zb-initiate-payment will fail to start initially)
docker-compose up zb-initialiser -d
docker-compose up zb-initiate-payment -d
```

## To initiate the Zebee Process:
* `POST /localhost:3000/init-order-process`
* Provide an orderId and orderValue i.e. `{ "orderId": 123, "orderValue": 100 }`

This will start an Initiate Payment Job, which the Zb-initiate-payment Worker will complete.

## Future

The POC can be extending to publish messages and implement additional workers for the remaining tasks in the process.

________________________________________________________________________________

# Zeebe with Operate

This directory contains a profile to run a single Zeebe broker with the embedded gateway, and an instance of Camunda Operate, with required components.

The components that will be started with this profile:

* Zeebe broker
* Camunda Operate
* Elastic Search
* Kibana

## Prerequisites

* [Docker](https://docs.docker.com/compose/install/)

## Preparation

* Clone this repository:

```bash
git clone https://github.com/zeebe-io/zeebe-docker-compose
```

## Start the containers

* Change into this directory:

```bash
cd zeebe-docker-compose/operate
```

* Start the profile:

```bash
docker-compose up
```

## Stop and remove the containers

* Press `Ctrl-C` to stop the containers.

* Destroy the stopped containers:

```bash
docker-compose down
```

## Remove persistent data

The `docker-compose.yml` file specifies persistent volumes for both Zeebe and Camunda Operate. This means that between executions your data is persisted. You may wish to remove all data to start from nothing. To do this, you need to delete the persistent volumes.

To delete all persistent data:

* Stop and remove the containers.

* Run the following command:

```bash
docker volume rm operate_zeebe_data
docker volume rm operate_zeebe_elasticsearch_data
```
