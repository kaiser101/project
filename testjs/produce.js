const amqp = require("amqplib/callback_api");
const _ = require("lodash");

const produceMsg = () => {
    amqp.connect("amqp://localhost", (error, connection) => {
        if (error) {
            throw error;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            let queue = "torrent-queue";
            let msg = "Test message" + new Date();

            channel.assertQueue(queue, {
                durable: true,
            });
            channel.sendToQueue(queue, Buffer.from(msg), {
                persistent: true,
            });
            console.log("Sent '%s'", msg);
        });
        setTimeout(() => {
            connection.close();
        }, 500);
    });
};

setInterval(produceMsg, 5000);
