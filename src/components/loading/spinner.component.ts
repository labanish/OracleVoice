/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import {IComponent} from "../../model/component.interface";
import {Utils} from "../../core/utils";

/**
 * This component creates loading animation element
 * <div class="spinner">
 *     <svg/>
 * </div>
 */
class SpinnerComponent implements IComponent{
    constructor(private utils: Utils){}
    render(): HTMLElement {
        const spinner = this.utils.createDiv(['spinner']);
        spinner.innerHTML = '<svg viewBox="0 0 64 64"><circle transform="translate(32,32)" r="26"></circle></svg>';
        return spinner;
    }
}

export {SpinnerComponent};