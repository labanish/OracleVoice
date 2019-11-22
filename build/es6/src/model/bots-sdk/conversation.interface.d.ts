/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import { IBotsSDKMessage } from './messages/message.interface';
import { IBotsSDKMessageAction } from './messages/actions/action.interface';
/**
 *
 */
interface IConversation {
    appMakerLastRead: number;
    appUserLastRead: number;
    completedUploads: any[];
    hasMoreMessages: boolean;
    messages: IBotsSDKMessage[];
    rejectedMessages: any;
    replyActions: {
        actions: IBotsSDKMessageAction[];
        message: IBotsSDKMessage;
    };
    unreadCount: number;
}
export { IConversation };
