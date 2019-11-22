/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
import { ISettings } from "./settings";
/**
 * This class contains widget helper methods
 */
declare class Utils {
    private settings;
    constructor(settings: ISettings);
    /**
     * Creates a deep clone of the provided object
     */
    clone(obj: any): any;
    /**
     * Converts urls in text to the HTML links
     */
    linkify(inputText: string, embeddedVideo: boolean): string;
    /**
     * extracts the youtube id from the link
     */
    getYouTubeVideoId(url: any): any;
    /**
     * adds the widget project name as the prefix to the css class
     */
    getCssClassWithPrefix(cssClass: any): string;
    /**
     * creates HTML button element
     */
    createButton(classNames?: string[]): HTMLButtonElement;
    /**
     * creates HTML anchor element
     */
    createAnchor(url?: string, text?: string, classNames?: string[]): HTMLAnchorElement;
    /**
     * creates HTML div element
     */
    createDiv(classNames?: string[]): HTMLDivElement;
    /**
     * creates HTML paragraph element
     */
    createParagraph(classNames?: string[]): HTMLParagraphElement;
    /**
     * creates HTML span element
     */
    createSpan(classNames?: string[]): HTMLSpanElement;
    /**
     * creates HTML input element
     */
    createInput(classNames?: string[]): HTMLInputElement;
    /**
     * creates HTML image element
     */
    createImage(url?: string, classNames?: string[]): HTMLImageElement;
    /**
     * creates HTML audio element
     */
    createAudio(url?: string, className?: string, autoplay?: boolean): HTMLAudioElement;
    /**
     * creates HTML video element
     */
    createVideo(url?: string, className?: string, autoplay?: boolean): HTMLVideoElement;
    /**
     * creates HTML div element with the HTML as child elements
     */
    createHTML(html: string): HTMLDivElement;
    /**
     * creates HTML style element
     */
    createStyle(style: string): HTMLStyleElement;
}
export { Utils };
