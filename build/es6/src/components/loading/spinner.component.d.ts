/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { IComponent } from "../../model/component.interface";
import { Utils } from "../../core/utils";
/**
 * This component creates loading animation element
 * <div class="spinner">
 *     <svg/>
 * </div>
 */
declare class SpinnerComponent implements IComponent {
    private utils;
    constructor(utils: Utils);
    render(): HTMLElement;
}
export { SpinnerComponent };
