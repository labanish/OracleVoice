/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../../component";
import { Utils } from "../../../core/utils";
/**
 * This component creates icon element.
 * <i class="icon {className}"/>
 */
export declare class IconComponent extends Component {
    private imgSrc;
    private className;
    constructor(utils: Utils, imgSrc: string, className?: string);
    render(element: any): void;
    protected _createElement(): HTMLElement;
}
