"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionComponentFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _actionPayload = require("../../model/common/payloads/action-payload/action-payload.interface");

var _postbackAction = require("../../components/chat/messages/actions/postback-action.component");

var _callAction = require("../../components/chat/messages/actions/call-action.component");

var _locationAction = require("../../components/chat/messages/actions/location-action.component");

var _urlAction = require("../../components/chat/messages/actions/url-action.component");

var _logger = require("../logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The factory creates action from action payload
 */
var ActionComponentFactory = function () {
    function ActionComponentFactory() {
        _classCallCheck(this, ActionComponentFactory);
    }

    _createClass(ActionComponentFactory, null, [{
        key: "fromActionPayload",
        value: function fromActionPayload(utils, payload) {
            switch (payload.type) {
                case _actionPayload.ACTION_TYPE.POST_BACK:
                    return new _postbackAction.PostbackActionComponent(utils, payload);
                case _actionPayload.ACTION_TYPE.CALL:
                    return new _callAction.CallActionComponent(utils, payload);
                case _actionPayload.ACTION_TYPE.LOCATION:
                    return new _locationAction.LocationActionComponent(utils, payload);
                case _actionPayload.ACTION_TYPE.URL:
                    return new _urlAction.UrlActionComponent(utils, payload);
                default:
                    ActionComponentFactory.logger.error('Payload contains wrong action type:' + payload.type);
                    return null;
            }
        }
    }]);

    return ActionComponentFactory;
}();

ActionComponentFactory.logger = new _logger.Logger('ActionComponentFactory');
exports.ActionComponentFactory = ActionComponentFactory;
//# sourceMappingURL=action-component.factory.js.map
