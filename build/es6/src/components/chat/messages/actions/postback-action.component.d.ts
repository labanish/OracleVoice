/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Utils } from "../../../../core/utils";
import { ActionComponent } from "./action.component";
import { IPostbackActionPayload } from "../../../../model/common/payloads/action-payload/postback-action-payload.interface";
/**
 * Converts action payload to component
 */
declare class PostbackActionComponent extends ActionComponent {
    postback: any;
    constructor(utils: Utils, payload: IPostbackActionPayload);
    render(): HTMLElement;
    getEventPayload(): Promise<any>;
}
export { PostbackActionComponent };
