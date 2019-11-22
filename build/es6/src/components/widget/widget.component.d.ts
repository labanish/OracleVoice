/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../component";
import { LoadingComponent } from "../loading/loading.component";
import { Utils } from "../../core/utils";
import { ISettings } from "../../core/settings";
import { IBotsService } from "../../providers/bots-service.interface";
/**
 * This component creates wrapper for the widget.
 * <div class="widget" style="{bottom, left, top, right}">
 *     <LoadingComponent/>
 *     <OpenButtonComponent/>
 *     <ChatComponent>
 * </div>
 */
export declare class WidgetComponent extends Component {
    private settings;
    private dataService;
    chatComponent: Component;
    chatButtonComponent: Component;
    loadingComponent: LoadingComponent;
    isOpen: boolean;
    constructor(utils: Utils, settings: ISettings, dataService: IBotsService);
    render(element: any): void;
    protected _createElement(): HTMLElement;
    showChat(): void;
}
