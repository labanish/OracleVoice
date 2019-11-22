/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Utils } from "../../../../core/utils";
import { ActionComponent } from "./action.component";
import { IUrlActionPayload } from "../../../../model/common/payloads/action-payload/url-action-payload.interface";
/**
 * Converts action payload to component
 */
declare class UrlActionComponent extends ActionComponent {
    url: string;
    constructor(utils: Utils, payload: IUrlActionPayload);
    render(): HTMLElement;
    getEventPayload(): Promise<string>;
}
export { UrlActionComponent };
