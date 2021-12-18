import { WebSocketServer } from "ws";
import amqp from "amqplib";
import _ from "lodash";
import log4js from "log4js";

log4js.configure({
    appenders: {
        websockets: {
            type: "dateFile",
            pattern: "yyyy-MM-dd",
            keepFileExt: true, //
            maxLogSize: 1024 * 1024 * 10, //1024 * 1024 * 1 = 1M
            backups: 2, //
            alwaysIncludePattern: true, //
            daysToKeep: 3, //
            filename: "websockets.log",
        },
    },
    categories: { default: { appenders: ["websockets"], level: "info" } },
});

const logger = log4js.getLogger("websockets");

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
