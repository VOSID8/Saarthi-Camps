const { sendTemporaryPassword } = require("../../api/services/emailUtils");
const { Worker } = require("bullmq");

const emailWorker = new Worker("email-queue", async (job) => {
    // console.log(job.data);
    const data = job.data;
    await sendTemporaryPassword(data.name, data.email, data.password);
}, {
    connection: {
        host: process.env.QUEUE_HOST,
        port: process.env.QUEUE_PORT,
        username: "default",
        password: process.env.PASSWORD
    },
    limiter: {
        max: 50,
        duration: 10 * 1000
    }
});

module.exports = emailWorker;