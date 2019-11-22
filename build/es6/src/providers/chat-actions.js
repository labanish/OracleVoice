import { PAYLOAD_TYPE } from "../model/common/payloads/message-payload/message-payload.interface";
import { BOT_MESSAGE_TYPE } from "../model/common/message-from";
import { Logger } from "../core/logger";
/**
 *  Class that process predefined actions
 */
class ChatActions {
    constructor(onMessage, onClear) {
        this.logger = new Logger('ChatActions');
        this.onMessage = onMessage;
        this.onClear = onClear;
    }
    process(message) {
        this.logger.debug('process:', message);
        switch (message.messagePayload.type) {
            case PAYLOAD_TYPE.TEXT:
                return this.processTextMessage(message);
            case PAYLOAD_TYPE.POSTBACK:
                return this.processPostbackMessage(message);
            case PAYLOAD_TYPE.LOCATION:
                return this.processLocationMessage(message);
            default:
                return false;
        }
    }
    processTextMessage(message) {
        let textMessage = message.messagePayload;
        if (textMessage.text === '@demo') {
            let payload = {
                "type": "text",
                "text": "What is response type to show?",
                "actions": [
                    {
                        "type": "postback",
                        "label": "Text",
                        "postback": '@demo text'
                    },
                    {
                        "type": "postback",
                        "label": "Vertical Cards",
                        "postback": '@demo cards vertical'
                    },
                    {
                        "type": "postback",
                        "label": "Horizontal Cards",
                        "postback": '@demo cards horizontal'
                    },
                    {
                        "type": "postback",
                        "label": "Video Attachment",
                        "postback": '@demo video attachment'
                    },
                    {
                        "type": "postback",
                        "label": "Audio Attachment",
                        "postback": '@demo audio attachment'
                    },
                    {
                        "type": "postback",
                        "label": "Image Attachment",
                        "postback": '@demo image attachment'
                    },
                    {
                        "type": "postback",
                        "label": "File Attachment",
                        "postback": '@demo file attachment'
                    },
                    {
                        "type": "postback",
                        "label": "Location",
                        "postback": '@demo location'
                    },
                    {
                        "type": "postback",
                        "label": "Raw",
                        "postback": '@demo raw'
                    },
                    {
                        "type": "postback",
                        "label": "Request Location",
                        "postback": '@demo request location'
                    }
                ]
            };
            let message = {
                from: {
                    type: BOT_MESSAGE_TYPE.USER,
                },
                body: {
                    messagePayload: payload
                }
            };
            this.onMessage(message);
            return true;
        }
        else if (textMessage.text === '@clear') {
            this.onClear();
            location.reload();
            return true;
        }
        else {
            return false;
        }
    }
    processPostbackMessage(message) {
        let postbackPayload = message.messagePayload;
        if (typeof postbackPayload.postback === 'string') {
            let payloads;
            switch (postbackPayload.postback) {
                case '@demo text':
                    payloads = [{
                            type: "text",
                            text: "This is text demo",
                            actions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ],
                            globalActions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ]
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
                                    actions: [
                                        {
                                            type: "postback",
                                            label: "Postback",
                                            postback: {
                                                prop: 'value'
                                            }
                                        },
                                        {
                                            type: "call",
                                            label: "Call",
                                            phoneNumber: '123412341234'
                                        },
                                        {
                                            type: "location",
                                            label: "Location"
                                        },
                                        {
                                            type: "url",
                                            label: "Url",
                                            url: 'http://www.oracle.com'
                                        }
                                    ]
                                }, {
                                    title: 'Card title',
                                    description: 'Card description',
                                    imageUrl: 'http://via.placeholder.com/350x150',
                                    url: 'http://www.oracle.com',
                                    actions: [
                                        {
                                            type: "postback",
                                            label: "Postback",
                                            postback: {
                                                prop: 'value'
                                            }
                                        },
                                        {
                                            type: "call",
                                            label: "Call",
                                            phoneNumber: '123412341234'
                                        },
                                        {
                                            type: "location",
                                            label: "Location"
                                        },
                                        {
                                            type: "url",
                                            label: "Url",
                                            url: 'http://www.oracle.com'
                                        }
                                    ]
                                }
                            ],
                            globalActions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ]
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
                                    actions: [
                                        {
                                            type: "postback",
                                            label: "Postback",
                                            postback: {
                                                prop: 'value'
                                            }
                                        },
                                        {
                                            type: "call",
                                            label: "Call",
                                            phoneNumber: '123412341234'
                                        },
                                        {
                                            type: "location",
                                            label: "Location"
                                        },
                                        {
                                            type: "url",
                                            label: "Url",
                                            url: 'http://www.oracle.com'
                                        }
                                    ]
                                }, {
                                    title: 'Card title',
                                    description: 'Card description',
                                    imageUrl: 'http://via.placeholder.com/350x150',
                                    url: 'http://www.oracle.com',
                                    actions: [
                                        {
                                            type: "postback",
                                            label: "Postback",
                                            postback: {
                                                prop: 'value'
                                            }
                                        },
                                        {
                                            type: "call",
                                            label: "Call",
                                            phoneNumber: '123412341234'
                                        },
                                        {
                                            type: "location",
                                            label: "Location"
                                        },
                                        {
                                            type: "url",
                                            label: "Url",
                                            url: 'http://www.oracle.com'
                                        }
                                    ]
                                }
                            ],
                            globalActions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ]
                        }];
                    break;
                case '@demo image attachment':
                    payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'image',
                                url: 'http://via.placeholder.com/350x150'
                            },
                            actions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ],
                            globalActions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ]
                        }];
                    break;
                case '@demo audio attachment':
                    payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'audio',
                                url: 'https://html5tutorial.info/media/vincent.mp3'
                            },
                            actions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ],
                            globalActions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ]
                        }];
                    break;
                case '@demo video attachment':
                    payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'video',
                                url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
                            },
                            actions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ],
                            globalActions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ]
                        }];
                    break;
                case '@demo file attachment':
                    payloads = [{
                            type: 'attachment',
                            attachment: {
                                type: 'file',
                                url: 'http://via.placeholder.com/350x150'
                            },
                            actions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ],
                            globalActions: [
                                {
                                    type: "postback",
                                    label: "Postback",
                                    postback: {
                                        prop: 'value'
                                    }
                                },
                                {
                                    type: "call",
                                    label: "Call",
                                    phoneNumber: '123412341234'
                                },
                                {
                                    type: "location",
                                    label: "Location"
                                },
                                {
                                    type: "url",
                                    label: "Url",
                                    url: 'http://www.oracle.com'
                                }
                            ]
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
                            actions: [
                                {
                                    type: "location",
                                    label: "@Share Location"
                                }
                            ],
                        }];
                    break;
            }
            if (payloads) {
                for (let payload of payloads) {
                    let message = {
                        from: {
                            type: BOT_MESSAGE_TYPE.BOT,
                        },
                        body: {
                            messagePayload: payload
                        }
                    };
                    this.onMessage(message);
                }
                return true;
            }
        }
        else {
            return false;
        }
    }
    processLocationMessage(message) {
        let messagePayload = message.messagePayload;
        if (messagePayload.location.title === '@demo location') {
            let payload = {
                type: 'location',
                location: {
                    title: 'Your location',
                    longitude: messagePayload.location.longitude,
                    latitude: messagePayload.location.latitude
                }
            };
            let message = {
                from: {
                    type: BOT_MESSAGE_TYPE.BOT,
                },
                body: {
                    messagePayload: payload
                }
            };
            this.onMessage(message);
            return true;
        }
        else {
            return false;
        }
    }
}
export { ChatActions };
//# sourceMappingURL=chat-actions.js.map