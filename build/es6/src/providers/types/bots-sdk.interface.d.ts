/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import { UserProfile } from "../../model/common/user-message.interface";
import { IConversation } from '../../model/bots-sdk/conversation.interface';
/**
 * Bots SDK type definition
 */
interface IBotsSDK {
    on(eventName: string, method: (data: any) => void): void;
    init(settings: {
        appId: string;
        embedded: boolean;
    }): Promise<any>;
    render(element: HTMLElement): void;
    getConversation(): IConversation;
    sendMessage(message: any): void;
    updateUser(userDetails: UserProfile): Promise<any>;
    triggerPostback(actionId: string): void;
    destroy(): void;
    logout(): void;
}
export { IBotsSDK };
