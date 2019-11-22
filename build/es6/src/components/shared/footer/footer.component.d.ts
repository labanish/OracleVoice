/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../../component";
import { Utils } from "../../../core/utils";
/**
 * The component creates footer toolbar element
 *  <div class="footer">
 *      <div class="toolbar">
 *          {content}
 *      </div>
 *  </div>
 */
export declare class FooterComponent extends Component {
    private className?;
    content: HTMLElement;
    constructor(utils: Utils, className?: string);
    render(element: any): void;
    protected _createElement(): HTMLElement;
    getContentElement(): HTMLElement;
}
