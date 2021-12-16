const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        var queue = "0b87ca1a126e9325c625781c8f80dcf852ad31df";
        channel.assertQueue(queue, {
            durable: true,
        });
        channel.prefetch(1);

        console.log("Waiting for messages in %s", queue);
        channel.consume(queue, (msg) => {
            console.log("Received '%s'", msg.content.toString());
            setTimeout(() => {
                channel.ack(msg);
            }, 1000);
        });
    });
});
