/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import { IBotsService } from "./bots-service.interface";
import { Logger } from "../core/logger";
import { ISettings } from "../core/settings";
/**
 * The widget data service entry point
 */
export declare class BotsDataService {
    config: ISettings;
    service: IBotsService;
    logger: Logger;
    constructor();
    init(): Promise<any>;
}
