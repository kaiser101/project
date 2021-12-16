import AMQPClient from "@cloudamqp/amqp-client";
// const AMQPClient = require("@cloudamqp/amqp-client");

const consumeMessage = async (queue) => {
    try {
        const amqp = new AMQPClient("ws://localhost", "/", "guest", "guest");
        const conn = await amqp.connect();
        const ch = await conn.channel();
        // attachPublish(ch);
        const q = await ch.queue(queue);
        // await q.bind("");
        const consumer = await q.subscribe({ noAck: false }, (msg) => {
            const str = new TextDecoder().decode(msg.body);
            console.log(str);
            msg.ack();
        });
        amqp.close();
    } catch (err) {
        console.error("Error", err, "reconnecting in 1s");
        // disablePublish();
        setTimeout(consumeMessage, 1000);
    }
};

export default consumeMessage;
// run("3D348C15F852E885E6F6AFA0F1A22927D37EDAA5");
