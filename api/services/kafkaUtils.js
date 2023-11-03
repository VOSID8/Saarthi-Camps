const kafka = require("./kafkaClient");

const kafkaSend = async (refugeeId, medicineName, medicineQuantity, medicineUrgency) => {
    const producer = kafka.producer();

    try {
        await producer.connect();

        await producer.send({
            topic: "campInfo",
            messages: [{
                key: "order",
                value: JSON.stringify({
                    refugeeId, medicineName, medicineQuantity, medicineUrgency
                }),
            }],
        });

        await producer.disconnect();
    } catch (error) {
        console.error("Error sending Kafka message:", error);
    }
};

module.exports = kafkaSend;