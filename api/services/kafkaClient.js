const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "saarthi",
    brokers: ["localhost:9092"],
});

module.exports = kafka;