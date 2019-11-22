/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import { PAYLOAD_TYPE } from "../common/payloads/message-payload/message-payload.interface";
import { LAYOUT } from "../common/payloads/message-payload/card-message-payload.interface";
import { ACTION_TYPE } from "../common/payloads/action-payload/action-payload.interface";
import { USER_MESSAGE_TYPE } from "../common/message-to";
import { BOT_MESSAGE_TYPE } from "../common/message-from";
import { ATTACHMENT_TYPE } from "../common/payloads/attachment-payload.interface";
import { Logger } from "../../core/logger";
import { BOTS_SDK_MESSAGE_ROLE, BOTS_SDK_PAYLOAD_TYPE } from "./messages/message.interface";
import { BOTS_SDK_ACTION_TYPE } from "./messages/actions/action.interface";
/**
 * The bots sdk message
 */
export class BotsSDKMessage {
    constructor() {
        this._logger = new Logger('BotsSDKMessage');
    }
    /**
     * Convert bots sdk message to common model message
     * @return {IMessage}
     */
    toCommonMessage() {
        let payload;
        switch (this.type) {
            case BOTS_SDK_PAYLOAD_TYPE.TEXT:
                payload = {
                    type: PAYLOAD_TYPE.TEXT,
                    text: this.text,
                    actions: this.convertSDKBotActionsToCommon(this.actions)
                };
                break;
            case BOTS_SDK_PAYLOAD_TYPE.LIST:
            case BOTS_SDK_PAYLOAD_TYPE.CAROUSEL:
                let cards = [];
                for (let item of this.items) {
                    cards.push({
                        title: item.title,
                        description: item.description,
                        imageUrl: item.mediaUrl,
                        actions: this.convertSDKBotActionsToCommon(item.actions)
                    });
                }
                payload = {
                    type: PAYLOAD_TYPE.CARD,
                    layout: (this.type === BOTS_SDK_PAYLOAD_TYPE.LIST ? LAYOUT.VERTICAL : LAYOUT.HORIZONTAL),
                    cards: cards,
                    globalActions: this.convertSDKBotActionsToCommon(this.actions)
                };
                break;
            case BOTS_SDK_PAYLOAD_TYPE.LOCATION:
                payload = {
                    type: PAYLOAD_TYPE.LOCATION,
                    location: {
                        title: this.text,
                        longitude: this.coordinates.long,
                        latitude: this.coordinates.lat
                    },
                    actions: this.convertSDKBotActionsToCommon(this.actions)
                };
                break;
            case BOTS_SDK_PAYLOAD_TYPE.IMAGE:
                payload = {
                    type: PAYLOAD_TYPE.ATTACHMENT,
                    attachment: {
                        type: ATTACHMENT_TYPE.IMAGE,
                        url: this.mediaUrl
                        // TODO: add this.text as caption
                    },
                    actions: this.convertSDKBotActionsToCommon(this.actions)
                };
                break;
            case BOTS_SDK_PAYLOAD_TYPE.FILE:
                let attachmentType = ATTACHMENT_TYPE.FILE;
                if (['video/quicktime'].indexOf(this.mediaType) > -1) {
                    attachmentType = ATTACHMENT_TYPE.VIDEO;
                }
                else if (['audio/mpeg'].indexOf(this.mediaType) > -1) {
                    attachmentType = ATTACHMENT_TYPE.AUDIO;
                }
                payload = {
                    type: PAYLOAD_TYPE.ATTACHMENT,
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
        if (this.role === BOTS_SDK_MESSAGE_ROLE.APP_USER) {
            return {
                to: {
                    type: USER_MESSAGE_TYPE.USER,
                    id: ''
                },
                messagePayload: payload,
            };
        }
        else {
            return {
                from: {
                    type: BOT_MESSAGE_TYPE.BOT
                },
                body: {
                    messagePayload: payload,
                }
            };
        }
    }
    /**
     * Convert the common model message to bots sdk message
     * @param {IUserMessage} message
     * @return {BotsSDKMessage}
     */
    static fromCommonMessage(message) {
        let botsSDKMessage;
        let payload = message.messagePayload;
        switch (payload.type) {
            case PAYLOAD_TYPE.TEXT:
                let txtPayload = payload;
                botsSDKMessage = {
                    type: BOTS_SDK_PAYLOAD_TYPE.TEXT,
                    text: txtPayload.text
                };
                break;
            case PAYLOAD_TYPE.LOCATION:
                let locationPayload = payload;
                botsSDKMessage = {
                    type: BOTS_SDK_PAYLOAD_TYPE.LOCATION,
                    coordinates: {
                        long: locationPayload.location.longitude,
                        lat: locationPayload.location.latitude
                    }
                };
                break;
        }
        return Object.assign(new BotsSDKMessage(), botsSDKMessage);
    }
    /**
     * Converts the bots sdk action to common message action
     * @param {IBotsSDKMessageAction[]} sdkActions
     * @return {IActionPayload[]}
     */
    convertSDKBotActionsToCommon(sdkActions) {
        let actions = [];
        if (sdkActions) {
            for (let sdkAction of sdkActions) {
                let action;
                switch (sdkAction.type) {
                    case BOTS_SDK_ACTION_TYPE.POSTBACK:
                        let postbackAction = sdkAction;
                        action = {
                            type: ACTION_TYPE.POST_BACK,
                            label: postbackAction.text,
                            postback: { payload: postbackAction.payload, id: postbackAction._id }
                        };
                        break;
                    case BOTS_SDK_ACTION_TYPE.LINK:
                        let linkAction = sdkAction;
                        action = {
                            type: ACTION_TYPE.URL,
                            label: linkAction.text,
                            url: linkAction.uri
                        };
                        break;
                    case BOTS_SDK_ACTION_TYPE.LOCATION_REQUEST:
                        action = {
                            type: ACTION_TYPE.LOCATION,
                            label: sdkAction.text,
                        };
                        break;
                    case BOTS_SDK_ACTION_TYPE.REPLY:
                        let replyAction = sdkAction;
                        action = {
                            type: ACTION_TYPE.POST_BACK,
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
        }
        return actions;
    }
}
//# sourceMappingURL=bots-sdk-message.js.map