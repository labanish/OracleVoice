"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BotsSDKService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require("../core/logger");

var _botsSdkMessage = require("../model/bots-sdk/bots-sdk-message");

var _messagePayload = require("../model/common/payloads/message-payload/message-payload.interface");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The service connect the widget with Bots server by Bots SDK
 */
var BotsSDKService = exports.BotsSDKService = function () {
    function BotsSDKService(config) {
        _classCallCheck(this, BotsSDKService);

        this.config = config;
        this._logger = new _logger.Logger('BotsSDKService');
        /**
         * The method called when message received by the service
         * @param {IMessage} message
         */
        this.onMessage = function (message) {};
    }
    /**
     * Initialize the service
     * @return {Promise<any>}
     */


    _createClass(BotsSDKService, [{
        key: "init",
        value: function init() {
            return this.loadSdk().then(this.initSdk.bind(this));
        }
    }, {
        key: "initSdk",
        value: function initSdk() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var element = _this.createHiddenDiv();
                Bots.on('message', function (message) {
                    _this._logger.info('a message was added to the conversation', message);
                    var msg = Object.assign(new _botsSdkMessage.BotsSDKMessage(), message);
                    _this.onMessage(msg.toCommonMessage());
                });
                Bots.init({ appId: _this.config.appId, embedded: true }).then(function () {
                    _this._logger.info('ready');
                    _this.updateUser({
                        "givenName": "John",
                        "surname": "Snow",
                        "email": "john.snow@winterfell.com",
                        "properties": {
                            "smoochCustomVariable1": "Lord",
                            "smoochCustomVariable2": "Commander"
                        }
                    });
                    resolve();
                }).catch(function (error) {
                    reject(error);
                });
                Bots.render(element);
            });
        }
        /**
         * Add SDK script to the page header element
         * @return {Promise<any>}
         */

    }, {
        key: "loadSdk",
        value: function loadSdk() {
            var _this2 = this;

            var name = 'Bots';
            return new Promise(function (resolve, reject) {
                var initProps = void 0,
                    renderProps = void 0,
                    destroyProps = void 0,
                    onEventProps = [],
                    callbacks = [];
                window[name] = {
                    init: function init() {
                        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                            props[_key] = arguments[_key];
                        }

                        initProps = props;
                        var promise = {
                            then: function then(callback) {
                                callbacks.push({
                                    type: 'then',
                                    next: callback
                                });
                                return promise;
                            },
                            catch: function _catch(callback) {
                                callbacks.push({
                                    type: 'catch',
                                    next: callback
                                });
                                return promise;
                            }
                        };
                        return promise;
                    },
                    on: function on() {
                        for (var _len2 = arguments.length, props = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            props[_key2] = arguments[_key2];
                        }

                        return onEventProps.push(props);
                    },
                    render: function render() {
                        for (var _len3 = arguments.length, props = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                            props[_key3] = arguments[_key3];
                        }

                        return renderProps = props;
                    },
                    destroy: function destroy() {
                        for (var _len4 = arguments.length, props = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                            props[_key4] = arguments[_key4];
                        }

                        return destroyProps = props;
                    }
                };
                window['__onWebMessengerHostReady__'] = function (bots) {
                    if (delete window['__onWebMessengerHostReady__'], window[name] = bots, initProps) {
                        for (var promise = bots.init.apply(bots, initProps), i = 0; i < callbacks.length; i++) {
                            var callback = callbacks[i];
                            promise = 'then' === callback.type ? promise.then(callback.next) : promise.catch(callback.next);
                        }
                    }
                    if (renderProps) {
                        bots.render.apply(bots, renderProps);
                    }
                    if (destroyProps) {
                        bots.destroy.apply(bots, destroyProps);
                    }
                    for (var _i = 0; _i < onEventProps.length; _i++) {
                        bots.on.apply(bots, onEventProps[_i]);
                    }
                };
                var request = new XMLHttpRequest();
                request.addEventListener('load', function () {
                    try {
                        var response = void 0;
                        if ((response = "string" == typeof this.response ? JSON.parse(this.response) : this.response).url) {
                            var script = document.createElement('script');
                            script.async = true;
                            script.src = response.url;
                            script.onload = function () {
                                return resolve();
                            };
                            document.getElementsByTagName('head')[0].appendChild(script);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
                request.open('GET', _this2.config.sdkUrl + '/loader.json', !0);
                request.responseType = 'json';
                request.send();
            });
        }
    }, {
        key: "createHiddenDiv",

        /**
         * This method creates hidden div to put in the hidden Bots SDK chat.
         * @return {HTMLDivElement}
         */
        value: function createHiddenDiv() {
            var element = document.createElement('div');
            element.id = 'chat_widget_web_bots_sdk_ui';
            element.style.display = 'none';
            document.body.appendChild(element);
            return element;
        }
        /**
         * The method loads chat history
         * @return {Promise<IMessage[]>}
         */

    }, {
        key: "loadChat",
        value: function loadChat() {
            var conversation = Bots.getConversation();
            var messages = [];
            for (var i = 0; i < conversation.messages.length; i++) {
                var message = conversation.messages[i];
                var botsSDKMessage = Object.assign(new _botsSdkMessage.BotsSDKMessage(), message);
                var commonMessage = botsSDKMessage.toCommonMessage();
                if (commonMessage) {
                    messages.push(commonMessage);
                }
                // add to the last message the global actions
                if (conversation.replyActions && conversation.replyActions.message._id === message._id && conversation.replyActions.actions.length > 0) {
                    var payload = commonMessage['messagePayload'] ? commonMessage['messagePayload'] : commonMessage['body'].messagePayload;
                    payload.globalActions = botsSDKMessage.convertSDKBotActionsToCommon(conversation['replyActions'].actions);
                }
            }
            return Promise.resolve(messages);
        }
        /**
         * Send the message to the Chat Server
         * @param {IUserMessage} message
         */

    }, {
        key: "send",
        value: function send(message) {
            this._logger.debug('send to channel', message);
            // TODO: if the message is postback, send as postback
            if (message.messagePayload.type === _messagePayload.PAYLOAD_TYPE.POSTBACK) {
                var postback = message.messagePayload;
                if (postback.postback.id) {
                    this._logger.debug('triggerPostback for action', postback.postback.id);
                    Bots.triggerPostback(postback.postback.id);
                } else {
                    // TODO: try to send as text message
                }
            } else {
                Bots.sendMessage(_botsSdkMessage.BotsSDKMessage.fromCommonMessage(message));
            }
        }
        /**
         * Update the user details
         */

    }, {
        key: "updateUser",
        value: function updateUser(userDetails) {
            return Bots.updateUser(userDetails).catch(function (err) {
                console.error(err);
                return err;
            });
        }
        /**
         * Clear the storage
         */

    }, {
        key: "clear",
        value: function clear() {
            var keys = Object.keys(localStorage);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] === 'appId') {
                    continue;
                }
                localStorage.removeItem(keys[i]);
            }
        }
    }]);

    return BotsSDKService;
}();
//# sourceMappingURL=bots-sdk-service.js.map
