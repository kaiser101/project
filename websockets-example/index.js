import { WebSocketServer } from "ws";
import amqp from "amqplib/callback_api.js";
import _ from "lodash";

const wss = new WebSocketServer({ port: 8080, clientTracking: true });

wss.on("connection", function connection(ws) {
    ws.on("message", function message(data) {
        console.log("received: %s", data);
    });

    amqp.connect("amqp://localhost", (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            var queue = "torrent-queue";
            channel.assertQueue(queue, {
                durable: true,
            });
            channel.prefetch(1);

            console.log("Waiting for messages in %s", queue);
            channel.consume(queue, (msg) => {
                console.log("Received '%s'", msg.content.toString());
                // const obj = JSON.parse(msg.content.toString())
                wss.clients.forEach((client) => {
                    client.send(msg.content.toString());
                });
                setTimeout(() => {
                    channel.ack(msg);
                }, 1000);
            });
        });
    });

    ws.send("something from server");
});
