/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { MessageComponent, MessageSide } from "../message.component";
import { IMessageComponent } from "../../../../model/message-component.interface";
import { ILocationMessagePayload } from "../../../../model/common/payloads/message-payload/location-message-payload.interface";
import { Utils } from "../../../../core/utils";
import { ISettings } from "../../../../core/settings";
/**
 * This component creates HTML elements for the location message type.
 */
declare class LocationMessageComponent extends MessageComponent implements IMessageComponent {
    title?: string;
    url?: string;
    longitude: number;
    latitude: number;
    constructor(utils: Utils, settings: ISettings, payload: ILocationMessagePayload, side: MessageSide);
    /**
     * Renders dom from component object
     * @return {HTMLElement}
     */
    render(): HTMLElement;
    getContent(): HTMLSpanElement;
}
export { LocationMessageComponent };
