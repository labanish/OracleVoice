/**
 * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
 * @ignore
 */
export class Logger {
    constructor(module) {
        this.module = module;
    }
    debug(...params) {
        this.log(Logger.LOG_LEVEL.DEBUG, params);
    }
    error(...params) {
        this.log(Logger.LOG_LEVEL.ERROR, params);
    }
    info(...params) {
        this.log(Logger.LOG_LEVEL.INFO, params);
    }
    warn(...params) {
        this.log(Logger.LOG_LEVEL.WARN, params);
    }
    log(level, params) {
        if (Logger.logLevel >= level) {
            params.unshift('[' + Logger.appName + '.' + Logger.appVersion + '.' + this.module + ']');
            let method;
            switch (Logger.logLevel) {
                case Logger.LOG_LEVEL.ERROR:
                    method = console.error;
                    break;
                case Logger.LOG_LEVEL.WARN:
                    method = console.warn;
                    break;
                case Logger.LOG_LEVEL.INFO:
                    method = console.info;
                    break;
                case Logger.LOG_LEVEL.DEBUG:
                    method = console.debug;
                    break;
            }
            if (Logger.historyEnabled) {
                Logger.history.push(Object.assign({}, params, { level }));
                if (Logger.historySize <= Logger.history.length) {
                    Logger.history.shift();
                }
            }
            method.apply(console, params);
        }
    }
}
Logger.LOG_LEVEL = {
    NONE: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4
};
Logger.logLevel = Logger.LOG_LEVEL.ERROR;
Logger.historyEnabled = false;
Logger.historySize = 100;
Logger.history = [];
//# sourceMappingURL=logger.js.map