/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../../component";
/**
 * This component creates icon element.
 * <i class="icon {className}"/>
 */
export class IconComponent extends Component {
    constructor(utils, imgSrc, className = '') {
        super(utils);
        this.imgSrc = imgSrc;
        this.className = className;
        this.element = this._createElement();
    }
    render(element) {
        element.appendChild(this.element);
    }
    _createElement() {
        let i = document.createElement('i');
        if (this.className) {
            i.classList.add(this.utils.getCssClassWithPrefix(this.className));
        }
        i.classList.add(this.utils.getCssClassWithPrefix('icon'));
        i.style.backgroundImage = 'url(\'' + this.imgSrc + '\')';
        return i;
    }
}
//# sourceMappingURL=icon.component.js.map