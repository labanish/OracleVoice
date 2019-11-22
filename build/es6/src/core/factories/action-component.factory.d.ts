/**
 * Copyright© 2018, Oracle and/or its affiliates. All rights reserved.
 */
import { Utils } from "../utils";
import { IActionPayload } from "../../model/common/payloads/action-payload/action-payload.interface";
import { ActionComponent } from "../../components/chat/messages/actions/action.component";
import { Logger } from "../logger";
/**
 * The factory creates action from action payload
 */
declare class ActionComponentFactory {
    static logger: Logger;
    static fromActionPayload(utils: Utils, payload: IActionPayload): ActionComponent;
}
export { ActionComponentFactory };
