/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../component";
import { LoadingComponent } from "../loading/loading.component";
import { ChatComponent } from "../chat/chat.component";
import { OpenButtonComponent } from "../open-button/open-button.component";
/**
 * This component creates wrapper for the widget.
 * <div class="widget" style="{bottom, left, top, right}">
 *     <LoadingComponent/>
 *     <OpenButtonComponent/>
 *     <ChatComponent>
 * </div>
 */
export class WidgetComponent extends Component {
    constructor(utils, settings, dataService) {
        super(utils);
        this.settings = settings;
        this.dataService = dataService;
        this.isOpen = false;
        this.element = this._createElement();
    }
    render(element) { }
    _createElement() {
        const div = this.utils.createDiv(['widget']);
        // set widget position
        if (this.settings.position.bottom) {
            div.style.bottom = this.settings.position.bottom;
        }
        if (this.settings.position.left) {
            div.style.left = this.settings.position.left;
        }
        if (this.settings.position.top) {
            div.style.top = this.settings.position.top;
        }
        if (this.settings.position.right) {
            div.style.right = this.settings.position.right;
        }
        this.loadingComponent = new LoadingComponent(this.utils);
        div.appendChild(this.loadingComponent.element);
        this.chatButtonComponent = new OpenButtonComponent(this.utils, this.settings, () => this.showChat());
        div.appendChild(this.chatButtonComponent.element);
        this.chatComponent = new ChatComponent(this.utils, this.settings, this.dataService, this.loadingComponent);
        div.appendChild(this.chatComponent.element);
        return div;
    }
    showChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.element.classList.add(this.utils.getCssClassWithPrefix('open'));
            this.element.classList.remove(this.utils.getCssClassWithPrefix('close'));
        }
        else {
            this.element.classList.add(this.utils.getCssClassWithPrefix('close'));
            this.element.classList.remove(this.utils.getCssClassWithPrefix('open'));
        }
    }
}
//# sourceMappingURL=widget.component.js.map