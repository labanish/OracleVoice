/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../../component";
/**
 *  <div class="header">
 *      <left-button class="left"></left-button>
 *      <span class="header-title">{title}</span>
 *      <span class="header-sub-title">{sub title}</span>
 *      <right-button class="right"></right-button>
 *  </div>
 */
export class HeaderComponent extends Component {
    constructor(utils, title, subTitle = null, className = '', rightButton = null, leftButton = null) {
        super(utils);
        this.title = title;
        this.subTitle = subTitle;
        this.className = className;
        this.rightButton = rightButton;
        this.leftButton = leftButton;
        this.element = this._createElement();
    }
    render(element) {
        element.appendChild(this.element);
    }
    _createElement() {
        let header = this.utils.createDiv(['header', this.className]);
        if (this.leftButton) {
            this.leftButton.addClass('left');
            header.appendChild(this.leftButton.element);
        }
        let titleElem = this.utils.createSpan(['header-title']);
        titleElem.innerText = this.title;
        header.appendChild(titleElem);
        if (this.subTitle) {
            let subTitleElem = this.utils.createSpan(['header-sub-title']);
            subTitleElem.innerText = this.subTitle;
            header.appendChild(subTitleElem);
        }
        if (this.rightButton) {
            this.rightButton.addClass('right');
            header.appendChild(this.rightButton.element);
        }
        return header;
    }
}
//# sourceMappingURL=header.component.js.map