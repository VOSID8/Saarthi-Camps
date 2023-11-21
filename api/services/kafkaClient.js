const { Kafka } = require("kafkajs");

const kafka = new Kafka({
    clientId: "saarthi",
    brokers: [process.env.PRIVATE_IP],
});

module.exports = kafka;