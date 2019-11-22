"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageComponentFactory = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messagePayload = require("../../model/common/payloads/message-payload/message-payload.interface");

var _message = require("../../components/chat/messages/message.component");

var _textMessage = require("../../components/chat/messages/text-message/text-message.component");

var _attachmentMessage = require("../../components/chat/messages/attachment-message/attachment-message.component");

var _cardMessage = require("../../components/chat/messages/card-message/card-message.component");

var _locationMessage = require("../../components/chat/messages/location-message/location-message.component");

var _rawMessage = require("../../components/chat/messages/raw-message/raw-message.component");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The factory creates message component from message payload
 */
var MessageComponentFactory = function () {
    function MessageComponentFactory() {
        _classCallCheck(this, MessageComponentFactory);
    }

    _createClass(MessageComponentFactory, null, [{
        key: "fromMessage",
        value: function fromMessage(utils, settings, message) {
            var side = void 0;
            var payload = void 0;
            if (message.from) {
                side = _message.MESSAGE_SIDE.LEFT;
                payload = message.body.messagePayload;
            } else {
                side = _message.MESSAGE_SIDE.RIGHT;
                payload = message.messagePayload;
            }
            switch (payload.type) {
                case _messagePayload.PAYLOAD_TYPE.TEXT:
                    return new _textMessage.TextMessageComponent(utils, settings, payload, side);
                case _messagePayload.PAYLOAD_TYPE.ATTACHMENT:
                    return new _attachmentMessage.AttachmentMessageComponent(utils, settings, payload, side);
                case _messagePayload.PAYLOAD_TYPE.CARD:
                    return new _cardMessage.CardMessageComponent(utils, settings, payload, side);
                case _messagePayload.PAYLOAD_TYPE.LOCATION:
                    return new _locationMessage.LocationMessageComponent(utils, settings, payload, side);
                case _messagePayload.PAYLOAD_TYPE.RAW:
                    return new _rawMessage.RawMessageComponent(utils, settings, payload, side);
                default:
                    throw Error('Wrong message payload type:' + payload.type);
            }
        }
    }]);

    return MessageComponentFactory;
}();

exports.MessageComponentFactory = MessageComponentFactory;
//# sourceMappingURL=message-component.factory.js.map
