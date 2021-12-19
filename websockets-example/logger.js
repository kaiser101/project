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

export default logger;
