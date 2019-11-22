import { Logger } from "../core/logger";
import { BotsSDKMessage } from "../model/bots-sdk/bots-sdk-message";
import { PAYLOAD_TYPE } from "../model/common/payloads/message-payload/message-payload.interface";
/**
 * The service connect the widget with Bots server by Bots SDK
 */
export class BotsSDKService {
    constructor(config) {
        this.config = config;
        this._logger = new Logger('BotsSDKService');
        /**
         * The method called when message received by the service
         * @param {IMessage} message
         */
        this.onMessage = (message) => { };
    }
    /**
     * Initialize the service
     * @return {Promise<any>}
     */
    init() {
        return this
            .loadSdk()
            .then(this.initSdk.bind(this));
    }
    initSdk() {
        return new Promise((resolve, reject) => {
            let element = this.createHiddenDiv();
            Bots.on('message', (message) => {
                this._logger.info('a message was added to the conversation', message);
                const msg = Object.assign(new BotsSDKMessage(), message);
                this.onMessage(msg.toCommonMessage());
            });
            Bots.init({ appId: this.config.appId, embedded: true }).then(() => {
                this._logger.info('ready');
                this.updateUser({
                    "givenName": "John",
                    "surname": "Snow",
                    "email": "john.snow@winterfell.com",
                    "properties": {
                        "smoochCustomVariable1": "Lord",
                        "smoochCustomVariable2": "Commander"
                    }
                });
                resolve();
            }).catch(error => {
                reject(error);
            });
            Bots.render(element);
        });
    }
    /**
     * Add SDK script to the page header element
     * @return {Promise<any>}
     */
    loadSdk() {
        let name = 'Bots';
        return new Promise((resolve, reject) => {
            let initProps, renderProps, destroyProps, onEventProps = [], callbacks = [];
            window[name] = {
                init: (...props) => {
                    initProps = props;
                    let promise = {
                        then: (callback) => {
                            callbacks.push({
                                type: 'then',
                                next: callback
                            });
                            return promise;
                        },
                        catch: (callback) => {
                            callbacks.push({
                                type: 'catch',
                                next: callback
                            });
                            return promise;
                        }
                    };
                    return promise;
                },
                on: (...props) => onEventProps.push(props),
                render: (...props) => renderProps = props,
                destroy: (...props) => destroyProps = props
            };
            window['__onWebMessengerHostReady__'] = (bots) => {
                if (delete window['__onWebMessengerHostReady__'], window[name] = bots, initProps) {
                    for (let promise = bots.init.apply(bots, initProps), i = 0; i < callbacks.length; i++) {
                        let callback = callbacks[i];
                        promise = 'then' === callback.type ? promise.then(callback.next) : promise.catch(callback.next);
                    }
                }
                if (renderProps) {
                    bots.render.apply(bots, renderProps);
                }
                if (destroyProps) {
                    bots.destroy.apply(bots, destroyProps);
                }
                for (let i = 0; i < onEventProps.length; i++) {
                    bots.on.apply(bots, onEventProps[i]);
                }
            };
            const request = new XMLHttpRequest;
            request.addEventListener('load', function () {
                try {
                    let response;
                    if ((response = "string" == typeof this.response ? JSON.parse(this.response) : this.response).url) {
                        let script = document.createElement('script');
                        script.async = true;
                        script.src = response.url;
                        script.onload = () => resolve();
                        document.getElementsByTagName('head')[0].appendChild(script);
                    }
                }
                catch (error) {
                    reject(error);
                }
            });
            request.open('GET', this.config.sdkUrl + '/loader.json', !0);
            request.responseType = 'json';
            request.send();
        });
    }
    ;
    /**
     * This method creates hidden div to put in the hidden Bots SDK chat.
     * @return {HTMLDivElement}
     */
    createHiddenDiv() {
        let element = document.createElement('div');
        element.id = 'chat_widget_web_bots_sdk_ui';
        element.style.display = 'none';
        document.body.appendChild(element);
        return element;
    }
    /**
     * The method loads chat history
     * @return {Promise<IMessage[]>}
     */
    loadChat() {
        let conversation = Bots.getConversation();
        let messages = [];
        for (let i = 0; i < conversation.messages.length; i++) {
            let message = conversation.messages[i];
            let botsSDKMessage = Object.assign(new BotsSDKMessage(), message);
            let commonMessage = botsSDKMessage.toCommonMessage();
            if (commonMessage) {
                messages.push(commonMessage);
            }
            // add to the last message the global actions
            if (conversation.replyActions &&
                conversation.replyActions.message._id === message._id &&
                conversation.replyActions.actions.length > 0) {
                let payload = commonMessage['messagePayload'] ? commonMessage['messagePayload'] : commonMessage['body'].messagePayload;
                payload.globalActions = botsSDKMessage.convertSDKBotActionsToCommon(conversation['replyActions'].actions);
            }
        }
        return Promise.resolve(messages);
    }
    /**
     * Send the message to the Chat Server
     * @param {IUserMessage} message
     */
    send(message) {
        this._logger.debug('send to channel', message);
        // TODO: if the message is postback, send as postback
        if (message.messagePayload.type === PAYLOAD_TYPE.POSTBACK) {
            let postback = message.messagePayload;
            if (postback.postback.id) {
                this._logger.debug('triggerPostback for action', postback.postback.id);
                Bots.triggerPostback(postback.postback.id);
            }
            else {
                // TODO: try to send as text message
            }
        }
        else {
            Bots.sendMessage(BotsSDKMessage.fromCommonMessage(message));
        }
    }
    /**
     * Update the user details
     */
    updateUser(userDetails) {
        return Bots.updateUser(userDetails)
            .catch((err) => {
            console.error(err);
            return err;
        });
    }
    /**
     * Clear the storage
     */
    clear() {
        let keys = Object.keys(localStorage);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === 'appId') {
                continue;
            }
            localStorage.removeItem(keys[i]);
        }
    }
}
//# sourceMappingURL=bots-sdk-service.js.map