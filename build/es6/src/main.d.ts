import { Utils } from "./core/utils";
import { ISettings } from "./core/settings";
import { IBotsService } from "./providers/bots-service.interface";
/**
 * The main starter class that load all other objects
 */
export declare class Main {
    private _logger;
    onLoad(): void;
    createWidget(utils: Utils, settings: ISettings, dataService: IBotsService): void;
}
