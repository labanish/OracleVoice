/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../../component";
import { Utils } from "../../../core/utils";
/**
 * This component creates a button with icon element
 * <button class="button icon-button {className}">
 *     <IconComponent>
 * </button>
 */
export declare class IconButtonComponent extends Component {
    private onClick;
    private imgSrc;
    private className;
    constructor(utils: Utils, onClick: Function, imgSrc: string, className?: string);
    render(element: any): void;
    protected _createElement(): HTMLElement;
}
