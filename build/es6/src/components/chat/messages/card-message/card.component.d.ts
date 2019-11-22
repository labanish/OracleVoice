/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { ActionComponent } from "../actions/action.component";
import { IMessageComponent } from "../../../../model/message-component.interface";
import { IActionEvent } from "../../../../model/action-event.interface";
import { ICardPayload } from "../../../../model/common/payloads/card-payload.interface";
import { Utils } from "../../../../core/utils";
/**
 * Converts card message payload to component.
 */
declare class CardComponent implements IMessageComponent {
    private utils;
    onActionClick: (event: IActionEvent) => void;
    title: string;
    description: string;
    imageUrl: string;
    url: string;
    actions: ActionComponent[];
    constructor(utils: Utils, payload: ICardPayload);
    handleOnActionClick(event: IActionEvent): void;
    /**
     * Renders dom from component object
     * <div class="card">
     *   <img src="imageUrl"/>
     *   <div class="card-content">
     *       <span class="card-title">{title}</span>
     *       <p>{description}</p>
     *   </div>
     *   <div class="card-actions">
     *      {actions}
     *   </div>
     *   <div class="clear"></div>
     * </div>
     * @return {HTMLElement}
     */
    render(): HTMLElement;
    /**
     * Disable actions buttons
     */
    disableActions(): void;
}
export { CardComponent };
