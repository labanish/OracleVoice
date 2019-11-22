/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../../component";
import { Utils } from "../../../core/utils";
/**
 *  <div class="header">
 *      <left-button class="left"></left-button>
 *      <span class="header-title">{title}</span>
 *      <span class="header-sub-title">{sub title}</span>
 *      <right-button class="right"></right-button>
 *  </div>
 */
export declare class HeaderComponent extends Component {
    private title;
    private subTitle;
    private className;
    private rightButton;
    private leftButton;
    constructor(utils: Utils, title: string, subTitle?: string, className?: string, rightButton?: Component, leftButton?: Component);
    render(element: HTMLElement): void;
    protected _createElement(): HTMLElement;
}
