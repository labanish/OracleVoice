"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatActions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messagePayload = require("../model/common/payloads/message-payload/message-payload.interface");

var _messageFrom = require("../model/common/message-from");

var _logger = require("../core/logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  Class that process predefined actions
 */
var ChatActions = function () {
    function ChatActions(onMessage, onClear) {
        _classCallCheck(this, ChatActions);

        this.logger = new _logger.Logger('ChatActions');
        this.onMessage = onMessage;
        this.onClear = onClear;
    }

    _createClass(ChatActions, [{
        key: "process",
        value: function process(message) {
            this.logger.debug('process:', message);
            switch (message.messagePayload.type) {
                case _messagePayload.PAYLOAD_TYPE.TEXT:
                    return this.processTextMessage(message);
                case _messagePayload.PAYLOAD_TYPE.POSTBACK:
                    return this.processPostbackMessage(message);
                case _messagePayload.PAYLOAD_TYPE.LOCATION:
                    return this.processLocationMessage(message);
                default:
                    return false;
            }
        }
    }, {
        key: "processTextMessage",
        value: function processTextMessage(message) {
            var textMessage = message.messagePayload;
            if (textMessage.text === '@demo') {
                var payload = {
                    "type": "text",
                    "text": "What is response type to show?",
                    "actions": [{
                        "type": "postback",
                        "label": "Text",
                        "postback": '@demo text'
                    }, {
                        "type": "postback",
                        "label": "Vertical Cards",
                        "postback": '@demo cards vertical'
                    }, {
                        "type": "postback",
                        "label": "Horizontal Cards",
                        "postback": '@demo cards horizontal'
                    }, {
                        "type": "postback",
                        "label": "Video Attachment",
                        "postback": '@demo video attachment'
                    }, {
                        "type": "postback",
                        "label": "Audio Attachment",
                        "postback": '@demo audio attachment'
                    }, {
                        "type": "postback",
                        "label": "Image Attachment",
                        "postback": '@demo image attachment'
                    }, {
                        "type": "postback",
                        "label": "File Attachment",
                        "postback": '@demo file attachment'
                    }, {
                        "type": "postback",
                        "label": "Location",
                        "postback": '@demo location'
                    }, {
                        "type": "postback",
                        "label": "Raw",
                        "postback": '@demo raw'
                    }, {
                        "type": "postback",
                        "label": "Request Location",
                        "postback": '@demo request location'
                    }]
                };
                var _message = {
                    from: {
                        type: _messageFrom.BOT_MESSAGE_TYPE.USER
                    },
                    body: {
                        messagePayload: payload
                    }
                };
                this.onMessage(_message);
                return true;
            } else if (textMessage.text === '@clear') {
                this.onClear();
                location.reload();
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "processPostbackMessage",
        value: function processPostbackMessage(message) {
            var postbackPayload = message.messagePayload;
            if (typeof postbackPayload.postback === 'string') {
                var payloads = void 0;
                switch (postbackPayload.postback) {
                    case '@demo text':
                        payloads = [{
                            type: "text",
                            text: "This is text demo",
                            actions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo cards horizontal':
                        payloads = [{
                            type: 'card',
                            layout: 'horizontal',
                            cards: [{
                                title: 'Card title',
                                description: 'Card description',
                                imageUrl: 'http://via.placeholder.com/350x150',
                                url: 'http://www.oracle.com',
                                actions: [{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                }, {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                }, {
                                    type: "location",
                                    label: "Location"
                                }, {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }]
                            }, {
                                title: 'Card title',
                                description: 'Card description',
                                imageUrl: 'http://via.placeholder.com/350x150',
                                url: 'http://www.oracle.com',
                                actions: [{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                }, {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                }, {
                                    type: "location",
                                    label: "Location"
                                }, {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }]
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo cards vertical':
                        payloads = [{
                            type: 'card',
                            layout: 'vertical',
                            cards: [{
                                title: 'Card title',
                                description: 'Card description',
                                imageUrl: 'http://via.placeholder.com/350x150',
                                url: 'http://www.oracle.com',
                                actions: [{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                }, {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                }, {
                                    type: "location",
                                    label: "Location"
                                }, {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }]
                            }, {
                                title: 'Card title',
                                description: 'Card description',
                                imageUrl: 'http://via.placeholder.com/350x150',
                                url: 'http://www.oracle.com',
                                actions: [{
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                }, {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                }, {
                                    type: "location",
                                    label: "Location"
                                }, {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }]
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo image attachment':
                        payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'image',
                                url: 'http://via.placeholder.com/350x150'
                            },
                            actions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo audio attachment':
                        payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'audio',
                                url: 'https://html5tutorial.info/media/vincent.mp3'
                            },
                            actions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo video attachment':
                        payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'video',
                                url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
                            },
                            actions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo file attachment':
                        payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'file',
                                url: 'http://via.placeholder.com/350x150'
                            },
                            actions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }],
                            globalActions: [{
                                type: "postback",
                                label: "Postback",
                                postback: {
                                    prop: 'value'
                                }
                            }, {
                                type: "call",
                                label: "Call",
                                phoneNumber: '123412341234'
                            }, {
                                type: "location",
                                label: "Location"
                            }, {
                                type: "url",
                                label: "Url",
                                url: 'http://www.oracle.com'
                            }]
                        }];
                        break;
                    case '@demo location':
                        payloads = [{
                            type: 'location',
                            location: {
                                title: 'Location title',
                                longitude: -79.388385,
                                latitude: 43.6435838
                            }
                        }];
                        break;
                    case '@demo raw':
                        payloads = [{
                            type: 'raw',
                            payload: {
                                property: 'value'
                            }
                        }];
                        break;
                    case '@demo request location':
                        payloads = [{
                            type: 'text',
                            text: "Please share your location.",
                            actions: [{
                                type: "location",
                                label: "@Share Location"
                            }]
                        }];
                        break;
                }
                if (payloads) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = payloads[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var payload = _step.value;

                            var _message2 = {
                                from: {
                                    type: _messageFrom.BOT_MESSAGE_TYPE.BOT
                                },
                                body: {
                                    messagePayload: payload
                                }
                            };
                            this.onMessage(_message2);
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

                    return true;
                }
            } else {
                return false;
            }
        }
    }, {
        key: "processLocationMessage",
        value: function processLocationMessage(message) {
            var messagePayload = message.messagePayload;
            if (messagePayload.location.title === '@demo location') {
                var payload = {
                    type: 'location',
                    location: {
                        title: 'Your location',
                        longitude: messagePayload.location.longitude,
                        latitude: messagePayload.location.latitude
                    }
                };
                var _message3 = {
                    from: {
                        type: _messageFrom.BOT_MESSAGE_TYPE.BOT
                    },
                    body: {
                        messagePayload: payload
                    }
                };
                this.onMessage(_message3);
                return true;
            } else {
                return false;
            }
        }
    }]);

    return ChatActions;
}();

exports.ChatActions = ChatActions;
//# sourceMappingURL=chat-actions.js.map
