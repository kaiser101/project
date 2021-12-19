import { WebSocketServer } from "ws";
import amqp from "amqplib";
import _ from "lodash";
import logger from "./logger.js";

const wss = new WebSocketServer({ port: 8080, clientTracking: true });

const clientMap = new Map();

wss.on("connection", function connection(ws) {
    ws.on("message", function message(data) {
        logger.info("received: %s", data);
        clientMap.set(_.toLower(data.toString()), ws);
    });

    const amqpconn = amqp.connect("amqp://localhost");

    const queue = "torrent-queue";

    amqpconn
        .then((connection) => connection.createChannel())
        .then((channel) =>
            channel.assertQueue(queue).then((ok) =>
                channel.consume(queue, (msg) => {
                    if (msg !== null) {
                        logger.info(msg.content.toString());

                        const obj = JSON.parse(msg.content.toString());
                        const clientKey = obj.torrent.toString();
                        const client = clientMap.get(clientKey);
                        if (client) {
                            client.send(obj.progress);
                        }

                        channel.ack(msg);
                    }
                })
            )
        )
        .catch(logger.warn);

    ws.send("something from server");
});
