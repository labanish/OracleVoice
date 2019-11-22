"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Main = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _logger = require("./core/logger");

var _utils = require("./core/utils");

var _style = require("./components/style/style.component");

var _botsDataService = require("./providers/bots-data-service");

var _widget = require("./components/widget/widget.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The main starter class that load all other objects
 */
var Main = exports.Main = function () {
    function Main() {
        _classCallCheck(this, Main);

        this._logger = new _logger.Logger('Main');
    }

    _createClass(Main, [{
        key: "onLoad",
        value: function onLoad() {
            var _this = this;

            this._logger.debug('onLoad', 'load chat widget');
            var botsDataService = new _botsDataService.BotsDataService();
            var utils = new _utils.Utils(botsDataService.config);
            if (!botsDataService.config.useCustomStyle) {
                // load default styles
                var style = new _style.StyleComponent(utils);
                document.head.appendChild(style.render());
            }
            botsDataService.init().then(function () {
                return _this.createWidget(utils, botsDataService.config, botsDataService.service);
            });
        }
    }, {
        key: "createWidget",
        value: function createWidget(utils, settings, dataService) {
            var widgetComponent = new _widget.WidgetComponent(utils, settings, dataService);
            widgetComponent.appendToElement(document.body);
            if (settings.isOpen) {
                widgetComponent.showChat();
            }
        }
    }]);

    return Main;
}();
// Attach chat widget loading to DOM ready event


var main = new Main();
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', main.onLoad.bind(main), false);
} else {
    window.addEventListener('load', main.onLoad.bind(main), false);
}
//# sourceMappingURL=main.js.map
