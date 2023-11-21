const kafka = require("./kafkaClient");

const kafkaSend = async (refugeeid, medicinename, medicinequantity, medicineurgency) => {
    const producer = kafka.producer();

    try {
        await producer.connect();

        const result = await producer.send({
            topic: "CampInfo",
            messages: [{
                partition: 0,
                key: "order",
                value: JSON.stringify({
                    refugeeid,
                    medicinename,
                    medicinequantity,
                    medicineurgency
                }),
            }],
        });

        await producer.disconnect();
    } catch (error) {
        console.error("Error sending Kafka message:", error);
    }
};

module.exports = kafkaSend;