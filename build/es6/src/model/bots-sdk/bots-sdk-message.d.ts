/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import { IActionPayload } from "../common/payloads/action-payload/action-payload.interface";
import { IUserMessage } from "../common/user-message.interface";
import { IMessage } from "../common/message";
import { BotsSDKMessageRoleType, BotsSDKMessageType, IBotsSDKMessage } from "./messages/message.interface";
import { IBotsSDKItem } from "./messages/list-message.interface";
import { IBotsSDKMessageAction } from "./messages/actions/action.interface";
/**
 * The bots sdk message
 */
export declare class BotsSDKMessage implements IBotsSDKMessage {
    private _logger;
    _id: string;
    text: string;
    type: BotsSDKMessageType;
    role?: BotsSDKMessageRoleType;
    actions?: IBotsSDKMessageAction[];
    items?: IBotsSDKItem[];
    mediaType?: string;
    mediaUrl?: string;
    name?: string;
    coordinates?: {
        lat: number;
        long: number;
    };
    /**
     * Convert bots sdk message to common model message
     * @return {IMessage}
     */
    toCommonMessage(): IMessage;
    /**
     * Convert the common model message to bots sdk message
     * @param {IUserMessage} message
     * @return {BotsSDKMessage}
     */
    static fromCommonMessage(message: IUserMessage): BotsSDKMessage;
    /**
     * Converts the bots sdk action to common message action
     * @param {IBotsSDKMessageAction[]} sdkActions
     * @return {IActionPayload[]}
     */
    convertSDKBotActionsToCommon(sdkActions: IBotsSDKMessageAction[]): IActionPayload[];
}
