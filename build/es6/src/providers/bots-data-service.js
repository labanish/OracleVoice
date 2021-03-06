/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import { BotsSDKService } from "./bots-sdk-service";
import { ChatServerService } from "./chat-server-service";
import { Logger } from "../core/logger";
import { defaultSettings, MODE } from "../core/settings";
/**
 * The widget data service entry point
 */
export class BotsDataService {
    constructor() {
        this.logger = new Logger('BotsDataService');
        const settings = Object.assign(defaultSettings, chatWidgetWebSettings);
        Logger.logLevel = settings.isDebugMode ? Logger.LOG_LEVEL.DEBUG : Logger.LOG_LEVEL.NONE;
        Logger.appName = settings.name;
        Logger.appVersion = settings.version;
        this.logger.debug('Create service with configuration', settings);
        if (!settings.mode) {
            throw Error('The bots config does not contain mode.');
        }
        if (settings.mode === MODE.BOTS_SDK && (!settings.appId || !settings.sdkUrl)) {
            throw Error('The bots config does not contain  one of required properties: appId or sdkUrl.');
        }
        if (settings.mode === MODE.CHAT_SERVER && (!settings.uri || !settings.userId || !settings.channel)) {
            throw Error('The bots config does not contain one of required properties: uri, channel, or userId.');
        }
        this.config = settings;
    }
    init() {
        this.service = this.config.mode === MODE.BOTS_SDK ? new BotsSDKService(this.config) : new ChatServerService(this.config);
        return this.service.init();
    }
}
//# sourceMappingURL=bots-data-service.js.map