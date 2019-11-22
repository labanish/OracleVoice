/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { ActionComponent } from "./action.component";
import { ICallActionPayload } from "../../../../model/common/payloads/action-payload/call-action-payload.interface";
import { Utils } from "../../../../core/utils";
/**
 * Converts action payload to component
 */
declare class CallActionComponent extends ActionComponent {
    phoneNumber: string;
    constructor(utils: Utils, payload: ICallActionPayload);
    render(): HTMLElement;
    getEventPayload(): Promise<string>;
}
export { CallActionComponent };
