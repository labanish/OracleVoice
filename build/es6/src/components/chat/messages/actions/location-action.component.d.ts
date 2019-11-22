/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Utils } from "../../../../core/utils";
import { ActionComponent } from "./action.component";
import { ILocationActionPayload } from "../../../../model/common/payloads/action-payload/location-action-payload.interface";
export declare type Position = {
    longitude: number;
    latitude: number;
};
/**
 * Converts action payload to component
 * Request browser for location, browser may in turn ask user for permission.
 * Location information is then sent to the Bot as a LocationMessagePayload.
 * If a location cannot be obtained from the browser, a pre-set location is sent to the Bot to allow testing to continue.
 */
declare class LocationActionComponent extends ActionComponent {
    constructor(utils: Utils, payload: ILocationActionPayload);
    render(): HTMLElement;
    getCurrentPosition(): Promise<Position>;
    getEventPayload(): Promise<any>;
}
export { LocationActionComponent };
