/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { IBotsService } from "./bots-service.interface";
import { IUserMessage } from "../model/common/user-message.interface";
import { IMessage } from "../model/common/message";
import { ISettings } from "../core/settings";
/**
 * The service connect the widget with Bots server by Bots SDK
 */
export declare class BotsSDKService implements IBotsService {
    private config;
    private _logger;
    /**
     * The method called when message received by the service
     * @param {IMessage} message
     */
    onMessage: (message: IMessage) => void;
    constructor(config: ISettings);
    /**
     * Initialize the service
     * @return {Promise<any>}
     */
    init(): Promise<any>;
    initSdk(): Promise<any>;
    /**
     * Add SDK script to the page header element
     * @return {Promise<any>}
     */
    loadSdk(): Promise<any>;
    /**
     * This method creates hidden div to put in the hidden Bots SDK chat.
     * @return {HTMLDivElement}
     */
    createHiddenDiv(): HTMLDivElement;
    /**
     * The method loads chat history
     * @return {Promise<IMessage[]>}
     */
    loadChat(): Promise<IMessage[]>;
    /**
     * Send the message to the Chat Server
     * @param {IUserMessage} message
     */
    send(message: IUserMessage): void;
    /**
     * Update the user details
     */
    updateUser(userDetails: any): Promise<any>;
    /**
     * Clear the storage
     */
    clear(): void;
}
