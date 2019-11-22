"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _component = require("../component");

var _header = require("../shared/header/header.component");

var _message = require("./messages/message.component");

var _messagePayload = require("../../model/common/payloads/message-payload/message-payload.interface");

var _loadingMessage = require("./messages/loading-message/loading-message.component");

var _actionPayload = require("../../model/common/payloads/action-payload/action-payload.interface");

var _message2 = require("../../model/common/message");

var _messageComponent = require("../../core/factories/message-component.factory");

var _logger = require("../../core/logger");

var _chatFooter = require("./chat-footer/chat-footer.component");

var _chatActions = require("../../providers/chat-actions");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * The component creates chat scrollable window
 * <HeaderComponent>
 * <div class="chat">
 *     <div id="ochat_widget_messages" class="scroll-content">
 *     </div>
 * </div>
 * <ChatFooterComponent>
 */
var ChatComponent = exports.ChatComponent = function (_Component) {
    _inherits(ChatComponent, _Component);

    function ChatComponent(utils, settings, dataService, loadingComponent) {
        _classCallCheck(this, ChatComponent);

        var _this = _possibleConstructorReturn(this, (ChatComponent.__proto__ || Object.getPrototypeOf(ChatComponent)).call(this, utils));

        _this.settings = settings;
        _this.dataService = dataService;
        _this.loadingComponent = loadingComponent;
        _this._logger = new _logger.Logger('ChatComponent');
        _this.element = _this._createElement();
        loadingComponent.present('Please wait ...');
        // load history messages
        dataService.loadChat().then(function (messages) {
            // free the main thread
            setTimeout(function () {
                _this.renderMessages(messages.slice());
                _this.scrollToBottom();
                loadingComponent.dismiss();
                dataService.onMessage = _this.onMessageReceived.bind(_this);
            });
        });
        _this.chatActions = new _chatActions.ChatActions(_this.onMessageReceived.bind(_this), _this.onClear.bind(_this));
        return _this;
    }

    _createClass(ChatComponent, [{
        key: "onClear",
        value: function onClear() {
            this.dataService.clear();
        }
        /**
         * Inherit form Component
         * @return {HTMLElement}
         */

    }, {
        key: "_createElement",
        value: function _createElement() {
            var chat = this.utils.createDiv(['chat']);
            this.scrollContent = this.utils.createDiv(['scroll-content']);
            this.scrollContent.id = ChatComponent.MESSAGES_ID;
            chat.appendChild(this.scrollContent);
            var footer = new _chatFooter.ChatFooterComponent(this.utils, this.sendMessage.bind(this), this.settings.sendIcon, this.settings.stopIcon, this.settings.chatInputPlaceholder);
            footer.appendToElement(chat);
            var header = new _header.HeaderComponent(this.utils, this.settings.chatTitle, this.settings.chatSubTitle, 'chat-title', null, null);
            header.prependToElement(chat);
            return chat;
        }
    }, {
        key: "render",
        value: function render(element) {}
        /**
         * Remove the element
         */

    }, {
        key: "remove",
        value: function remove() {
            _get(ChatComponent.prototype.__proto__ || Object.getPrototypeOf(ChatComponent.prototype), "remove", this).call(this);
            this.dataService.onMessage = function () {};
        }
        /**
         * Render messages in the chat
         * @param {IMessage[]} messages
         */

    }, {
        key: "renderMessages",
        value: function renderMessages(messages) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = messages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var message = _step.value;

                    var messageComponent = _messageComponent.MessageComponentFactory.fromMessage(this.utils, this.settings, message);
                    messageComponent.onActionClick = this.onMessageActionClicked.bind(this);
                    this.scrollContent.appendChild(messageComponent.render());
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
        }
        /**
         * Called when message action button was clicked
         * @param {IMessageActionEvent} event
         */

    }, {
        key: "onMessageActionClicked",
        value: function onMessageActionClicked(event) {
            var _this2 = this;

            event.messageComponent.disableActions();
            if (event.type === _actionPayload.ACTION_TYPE.POST_BACK) {
                event.getPayload().then(function (payload) {
                    var message = (0, _message2.createUserMessage)({
                        type: _messagePayload.PAYLOAD_TYPE.POSTBACK,
                        text: event.label,
                        postback: payload
                    }, _this2.settings.channel);
                    _this2.sendMessageToServer(message);
                });
            } else if (event.type === _actionPayload.ACTION_TYPE.LOCATION) {
                // add loading element to the chat
                var messagesElement = document.getElementById(ChatComponent.MESSAGES_ID);
                var loading = new _loadingMessage.LoadingMessageComponent('Loading location', _message.MESSAGE_SIDE.RIGHT, this.utils);
                messagesElement.appendChild(loading.render());
                this.scrollToBottom();
                // get event payload
                event.getPayload().then(function (payload) {
                    loading.remove();
                    var message = (0, _message2.createUserMessage)({
                        type: _messagePayload.PAYLOAD_TYPE.LOCATION,
                        location: {
                            title: event.label === '@Share Location' ? '@demo location' : undefined,
                            longitude: payload.longitude,
                            latitude: payload.latitude
                        }
                    }, _this2.settings.channel);
                    _this2.sendMessageToServer(message);
                });
            }
        }
        /**
         * Called when message received from the server
         * @param {IMessage} message
         */

    }, {
        key: "onMessageReceived",
        value: function onMessageReceived(message) {
            this._logger.debug('onMessageReceived', message);
            this.renderMessages([message]);
            this.scrollToBottom();
        }
        /**
         * Create and send user message
         * @param {string} text
         */

    }, {
        key: "sendMessage",
        value: function sendMessage(text) {
            var payload = {
                type: _messagePayload.PAYLOAD_TYPE.TEXT,
                text: text
            };
            var message = (0, _message2.createUserMessage)(payload, this.settings.channel);
            this.sendMessageToServer(message);
        }
        /**
         * Send message to the server
         * @param message
         */

    }, {
        key: "sendMessageToServer",
        value: function sendMessageToServer(message) {
            // Check if the message is chat action and application in debug mode
            if (!this.settings.isDebugMode || !this.chatActions.process(message)) {
                this.dataService.send(message);
            }
        }
        /**
         * Scroll all the chat content to the last message
         */

    }, {
        key: "scrollToBottom",
        value: function scrollToBottom() {
            setTimeout(function () {
                var element = document.getElementById(ChatComponent.MESSAGES_ID);
                element.scrollTop = element.scrollHeight - 300;
            });
        }
    }]);

    return ChatComponent;
}(_component.Component);

ChatComponent.MESSAGES_ID = 'ochat_widget_messages';
//# sourceMappingURL=chat.component.js.map
