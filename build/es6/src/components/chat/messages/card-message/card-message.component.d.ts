/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { MessageComponent, MessageSide } from "../message.component";
import { IMessageComponent } from "../../../../model/message-component.interface";
import { ICardMessagePayload, Layout } from "../../../../model/common/payloads/message-payload/card-message-payload.interface";
import { CardComponent } from "./card.component";
import { Utils } from "../../../../core/utils";
import { ISettings } from "../../../../core/settings";
/**
 * Converts card message payload to component
 */
declare class CardMessageComponent extends MessageComponent implements IMessageComponent {
    layout: Layout;
    cards: CardComponent[];
    constructor(utils: Utils, settings: ISettings, payload: ICardMessagePayload, side: MessageSide);
    /**
     * Renders dom from component object
     * <div class="card-message card-message-horizontal | card-message-vertical">
     *    <div class="card-message-content">
     *        <div class="card-message-cards">
     *            {cards}
     *        </div>
     *        <div class="message-actions">{actions}</div>
     *    </div>
     *    <div class="message-global-actions">{globalActions}</div>
     * </div>
     * @return {HTMLElement}
     */
    render(): HTMLElement;
    disableActions(): void;
}
export { CardMessageComponent };
