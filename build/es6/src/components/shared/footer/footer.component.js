/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../../component";
/**
 * The component creates footer toolbar element
 *  <div class="footer">
 *      <div class="toolbar">
 *          {content}
 *      </div>
 *  </div>
 */
export class FooterComponent extends Component {
    constructor(utils, className) {
        super(utils);
        this.className = className;
        this.element = this._createElement();
    }
    render(element) {
        element.appendChild(this.element);
    }
    _createElement() {
        let footer = this.utils.createDiv(['footer']);
        let toolbar = this.utils.createDiv(['toolbar']);
        this.content = toolbar;
        footer.appendChild(toolbar);
        return footer;
    }
    getContentElement() {
        return this.content;
    }
}
//# sourceMappingURL=footer.component.js.map