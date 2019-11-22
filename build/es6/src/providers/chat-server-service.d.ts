import { IUserMessage } from "../model/common/user-message.interface";
import { IMessage } from "../model/common/message";
import { IBotsService } from "./bots-service.interface";
import { ISettings } from "../core/settings";
/**
 * The service connect the widget with Chat Server by utilizing the ReconnectingWebSocket object.
 */
export declare class ChatServerService implements IBotsService {
    private config;
    private _ws;
    private _logger;
    private _uri;
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
     * Process message received from Chat Server
     * @param {MessageEvent} event
     */
    private wsMessage;
    clear(): void;
}
