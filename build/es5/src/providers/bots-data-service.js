"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotsDataService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _botsSdkService = require("./bots-sdk-service");

var _chatServerService = require("./chat-server-service");

var _logger = require("../core/logger");

var _settings = require("../core/settings");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The widget data service entry point
 */
var BotsDataService = exports.BotsDataService = function () {
    function BotsDataService() {
        _classCallCheck(this, BotsDataService);

        this.logger = new _logger.Logger('BotsDataService');
        var settings = Object.assign(_settings.defaultSettings, chatWidgetWebSettings);
        _logger.Logger.logLevel = settings.isDebugMode ? _logger.Logger.LOG_LEVEL.DEBUG : _logger.Logger.LOG_LEVEL.NONE;
        _logger.Logger.appName = settings.name;
        _logger.Logger.appVersion = settings.version;
        this.logger.debug('Create service with configuration', settings);
        if (!settings.mode) {
            throw Error('The bots config does not contain mode.');
        }
        if (settings.mode === _settings.MODE.BOTS_SDK && (!settings.appId || !settings.sdkUrl)) {
            throw Error('The bots config does not contain  one of required properties: appId or sdkUrl.');
        }
        if (settings.mode === _settings.MODE.CHAT_SERVER && (!settings.uri || !settings.userId || !settings.channel)) {
            throw Error('The bots config does not contain one of required properties: uri, channel, or userId.');
        }
        this.config = settings;
    }

    _createClass(BotsDataService, [{
        key: "init",
        value: function init() {
            this.service = this.config.mode === _settings.MODE.BOTS_SDK ? new _botsSdkService.BotsSDKService(this.config) : new _chatServerService.ChatServerService(this.config);
            return this.service.init();
        }
    }]);

    return BotsDataService;
}();
//# sourceMappingURL=bots-data-service.js.map
