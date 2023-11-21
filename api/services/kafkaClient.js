const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "saarthi",
    brokers: ["172.16.55.234:9092"],
});

module.exports = kafka;