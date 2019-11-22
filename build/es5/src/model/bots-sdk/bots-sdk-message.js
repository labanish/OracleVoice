"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotsSDKMessage = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _messagePayload = require("../common/payloads/message-payload/message-payload.interface");

var _cardMessagePayload = require("../common/payloads/message-payload/card-message-payload.interface");

var _actionPayload = require("../common/payloads/action-payload/action-payload.interface");

var _messageTo = require("../common/message-to");

var _messageFrom = require("../common/message-from");

var _attachmentPayload = require("../common/payloads/attachment-payload.interface");

var _logger = require("../../core/logger");

var _message = require("./messages/message.interface");

var _action = require("./messages/actions/action.interface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The bots sdk message
 */
var BotsSDKMessage = exports.BotsSDKMessage = function () {
    function BotsSDKMessage() {
        _classCallCheck(this, BotsSDKMessage);

        this._logger = new _logger.Logger('BotsSDKMessage');
    }
    /**
     * Convert bots sdk message to common model message
     * @return {IMessage}
     */


    _createClass(BotsSDKMessage, [{
        key: "toCommonMessage",
        value: function toCommonMessage() {
            var payload = void 0;
            switch (this.type) {
                case _message.BOTS_SDK_PAYLOAD_TYPE.TEXT:
                    payload = {
                        type: _messagePayload.PAYLOAD_TYPE.TEXT,
                        text: this.text,
                        actions: this.convertSDKBotActionsToCommon(this.actions)
                    };
                    break;
                case _message.BOTS_SDK_PAYLOAD_TYPE.LIST:
                case _message.BOTS_SDK_PAYLOAD_TYPE.CAROUSEL:
                    var cards = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var item = _step.value;

                            cards.push({
                                title: item.title,
                                description: item.description,
                                imageUrl: item.mediaUrl,
                                actions: this.convertSDKBotActionsToCommon(item.actions)
                            });
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    payload = {
                        type: _messagePayload.PAYLOAD_TYPE.CARD,
                        layout: this.type === _message.BOTS_SDK_PAYLOAD_TYPE.LIST ? _cardMessagePayload.LAYOUT.VERTICAL : _cardMessagePayload.LAYOUT.HORIZONTAL,
                        cards: cards,
                        globalActions: this.convertSDKBotActionsToCommon(this.actions)
                    };
                    break;
                case _message.BOTS_SDK_PAYLOAD_TYPE.LOCATION:
                    payload = {
                        type: _messagePayload.PAYLOAD_TYPE.LOCATION,
                        location: {
                            title: this.text,
                            longitude: this.coordinates.long,
                            latitude: this.coordinates.lat
                        },
                        actions: this.convertSDKBotActionsToCommon(this.actions)
                    };
                    break;
                case _message.BOTS_SDK_PAYLOAD_TYPE.IMAGE:
                    payload = {
                        type: _messagePayload.PAYLOAD_TYPE.ATTACHMENT,
                        attachment: {
                            type: _attachmentPayload.ATTACHMENT_TYPE.IMAGE,
                            url: this.mediaUrl
                            // TODO: add this.text as caption
                        },
                        actions: this.convertSDKBotActionsToCommon(this.actions)
                    };
                    break;
                case _message.BOTS_SDK_PAYLOAD_TYPE.FILE:
                    var attachmentType = _attachmentPayload.ATTACHMENT_TYPE.FILE;
                    if (['video/quicktime'].indexOf(this.mediaType) > -1) {
                        attachmentType = _attachmentPayload.ATTACHMENT_TYPE.VIDEO;
                    } else if (['audio/mpeg'].indexOf(this.mediaType) > -1) {
                        attachmentType = _attachmentPayload.ATTACHMENT_TYPE.AUDIO;
                    }
                    payload = {
                        type: _messagePayload.PAYLOAD_TYPE.ATTACHMENT,
                        attachment: {
                            type: attachmentType,
                            url: this.mediaUrl
                            // TODO: add this.text as caption
                        },
                        actions: this.convertSDKBotActionsToCommon(this.actions)
                    };
                    break;
                default:
                    this._logger.error('This Bots SDK message type is not implemented. ', this);
                    break;
            }
            this._logger.debug('toCommonMessage', this, payload);
            if (this.role === _message.BOTS_SDK_MESSAGE_ROLE.APP_USER) {
                return {
                    to: {
                        type: _messageTo.USER_MESSAGE_TYPE.USER,
                        id: ''
                    },
                    messagePayload: payload
                };
            } else {
                return {
                    from: {
                        type: _messageFrom.BOT_MESSAGE_TYPE.BOT
                    },
                    body: {
                        messagePayload: payload
                    }
                };
            }
        }
        /**
         * Convert the common model message to bots sdk message
         * @param {IUserMessage} message
         * @return {BotsSDKMessage}
         */

    }, {
        key: "convertSDKBotActionsToCommon",

        /**
         * Converts the bots sdk action to common message action
         * @param {IBotsSDKMessageAction[]} sdkActions
         * @return {IActionPayload[]}
         */
        value: function convertSDKBotActionsToCommon(sdkActions) {
            var actions = [];
            if (sdkActions) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = sdkActions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var sdkAction = _step2.value;

                        var action = void 0;
                        switch (sdkAction.type) {
                            case _action.BOTS_SDK_ACTION_TYPE.POSTBACK:
                                var postbackAction = sdkAction;
                                action = {
                                    type: _actionPayload.ACTION_TYPE.POST_BACK,
                                    label: postbackAction.text,
                                    postback: { payload: postbackAction.payload, id: postbackAction._id }
                                };
                                break;
                            case _action.BOTS_SDK_ACTION_TYPE.LINK:
                                var linkAction = sdkAction;
                                action = {
                                    type: _actionPayload.ACTION_TYPE.URL,
                                    label: linkAction.text,
                                    url: linkAction.uri
                                };
                                break;
                            case _action.BOTS_SDK_ACTION_TYPE.LOCATION_REQUEST:
                                action = {
                                    type: _actionPayload.ACTION_TYPE.LOCATION,
                                    label: sdkAction.text
                                };
                                break;
                            case _action.BOTS_SDK_ACTION_TYPE.REPLY:
                                var replyAction = sdkAction;
                                action = {
                                    type: _actionPayload.ACTION_TYPE.POST_BACK,
                                    label: replyAction.text,
                                    postback: { payload: replyAction.payload, id: replyAction._id }
                                };
                                break;
                            default:
                                this._logger.error('Not supported BOTS SDK action. ', sdkAction);
                                break;
                        }
                        if (action) {
                            actions.push(action);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            return actions;
        }
    }], [{
        key: "fromCommonMessage",
        value: function fromCommonMessage(message) {
            var botsSDKMessage = void 0;
            var payload = message.messagePayload;
            switch (payload.type) {
                case _messagePayload.PAYLOAD_TYPE.TEXT:
                    var txtPayload = payload;
                    botsSDKMessage = {
                        type: _message.BOTS_SDK_PAYLOAD_TYPE.TEXT,
                        text: txtPayload.text
                    };
                    break;
                case _messagePayload.PAYLOAD_TYPE.LOCATION:
                    var locationPayload = payload;
                    botsSDKMessage = {
                        type: _message.BOTS_SDK_PAYLOAD_TYPE.LOCATION,
                        coordinates: {
                            long: locationPayload.location.longitude,
                            lat: locationPayload.location.latitude
                        }
                    };
                    break;
            }
            return Object.assign(new BotsSDKMessage(), botsSDKMessage);
        }
    }]);

    return BotsSDKMessage;
}();
//# sourceMappingURL=bots-sdk-message.js.map
