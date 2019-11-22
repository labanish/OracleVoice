"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createBotMessage = exports.createUserMessage = undefined;

var _messageTo = require("./message-to");

/**
 * creates the user message from payload
 */
var createUserMessage = exports.createUserMessage = function createUserMessage(payload, channel) {
    return {
        to: {
            type: _messageTo.USER_MESSAGE_TYPE.BOT,
            id: channel
        },
        messagePayload: payload
    };
};
/**
 * creates the bot message from payload
 */
var createBotMessage = exports.createBotMessage = function createBotMessage(from, payload) {
    return {
        from: from,
        body: { messagePayload: payload }
    };
};
//# sourceMappingURL=message.js.map
