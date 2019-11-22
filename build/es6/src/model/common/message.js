import { USER_MESSAGE_TYPE } from "./message-to";
/**
 * creates the user message from payload
 */
export const createUserMessage = (payload, channel) => {
    return {
        to: {
            type: USER_MESSAGE_TYPE.BOT,
            id: channel
        },
        messagePayload: payload
    };
};
/**
 * creates the bot message from payload
 */
export const createBotMessage = (from, payload) => {
    return {
        from: from,
        body: { messagePayload: payload }
    };
};
//# sourceMappingURL=message.js.map