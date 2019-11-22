/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { IComponent } from "../../model/component.interface";
import { Utils } from "../../core/utils";
/**
 * Creates style element with the widget styles
 */
declare class StyleComponent implements IComponent {
    private utils;
    static STYLE: string;
    constructor(utils: Utils);
    render(): HTMLElement;
}
export { StyleComponent };
