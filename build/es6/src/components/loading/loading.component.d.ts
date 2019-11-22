/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { Component } from "../component";
import { Utils } from "../../core/utils";
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
export declare class LoadingComponent extends Component {
    content: HTMLElement;
    constructor(utils: Utils);
    render(element: any): void;
    _createElement(): HTMLElement;
    present(message: string): void;
    dismiss(): void;
    getContentElement(): HTMLElement;
    setContent(message: string): void;
}
