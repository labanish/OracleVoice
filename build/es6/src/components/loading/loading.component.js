/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../component";
import { SpinnerComponent } from "./spinner.component";
/**
 * This component creates full screen loading element.
 <div id="loading">
     <div class="backdrop"></div>
     <div class="loading-wrapper">
        {SpinnerComponent}
         <div class="content"></div>
     </div>
 </div>
 */
export class LoadingComponent extends Component {
    constructor(utils) {
        super(utils);
        this.element = this._createElement();
        this.hide();
    }
    render(element) {
    }
    _createElement() {
        let loading = this.utils.createDiv(['loading']);
        loading.appendChild(this.utils.createDiv(['backdrop']));
        const wrapper = loading.appendChild(this.utils.createDiv(['wrapper']));
        wrapper.appendChild(new SpinnerComponent(this.utils).render());
        this.content = wrapper.appendChild(this.utils.createDiv(['content']));
        return loading;
    }
    present(message) {
        this.hide(false);
        this.setContent(message);
    }
    dismiss() {
        this.hide();
        this.setContent('');
    }
    getContentElement() {
        return this.element;
    }
    setContent(message) {
        this.content.innerHTML = message;
    }
}
//# sourceMappingURL=loading.component.js.map