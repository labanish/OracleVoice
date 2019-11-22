/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { IComponent } from "../../../../model/component.interface";
import { IActionEvent } from "../../../../model/action-event.interface";
import { ActionType, IActionPayload } from "../../../../model/common/payloads/action-payload/action-payload.interface";
import { Utils } from "../../../../core/utils";
/**
 * Base class for action components
 */
declare abstract class ActionComponent implements IComponent {
    protected utils: Utils;
    onActionClick: (event: IActionEvent) => void;
    type: ActionType;
    label: string;
    imageUrl: string;
    disabled: boolean;
    htmlElement: HTMLElement;
    constructor(utils: Utils, payload: IActionPayload);
    render(): HTMLElement;
    handleOnClick(event: MouseEvent): void;
    abstract getEventPayload(): Promise<any>;
    disable(): void;
}
export { ActionComponent };
