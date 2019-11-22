'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
 * @ignore
 */
var Logger = exports.Logger = function () {
    function Logger(module) {
        _classCallCheck(this, Logger);

        this.module = module;
    }

    _createClass(Logger, [{
        key: 'debug',
        value: function debug() {
            for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
            }

            this.log(Logger.LOG_LEVEL.DEBUG, params);
        }
    }, {
        key: 'error',
        value: function error() {
            for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                params[_key2] = arguments[_key2];
            }

            this.log(Logger.LOG_LEVEL.ERROR, params);
        }
    }, {
        key: 'info',
        value: function info() {
            for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                params[_key3] = arguments[_key3];
            }

            this.log(Logger.LOG_LEVEL.INFO, params);
        }
    }, {
        key: 'warn',
        value: function warn() {
            for (var _len4 = arguments.length, params = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                params[_key4] = arguments[_key4];
            }

            this.log(Logger.LOG_LEVEL.WARN, params);
        }
    }, {
        key: 'log',
        value: function log(level, params) {
            if (Logger.logLevel >= level) {
                params.unshift('[' + Logger.appName + '.' + Logger.appVersion + '.' + this.module + ']');
                var method = void 0;
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
                    Logger.history.push(Object.assign({}, params, { level: level }));
                    if (Logger.historySize <= Logger.history.length) {
                        Logger.history.shift();
                    }
                }
                method.apply(console, params);
            }
        }
    }]);

    return Logger;
}();

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
