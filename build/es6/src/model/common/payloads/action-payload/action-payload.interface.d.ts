/**
 * Copyright© 2017, Oracle and/or its affiliates. All rights reserved.
 */
/**
 * The action payload type
 */
declare type ActionType = 'postback' | 'call' | 'url' | 'location';
export { ActionType };
declare const ACTION_TYPE: {
    POST_BACK: string;
    CALL: string;
    URL: string;
    LOCATION: string;
};
/**
 * The action payload
 */
interface IActionPayload {
    /**
     * The action payload type
     */
    type: ActionType;
    /**
     * The label to display for the action.
     * At least one of label or imageUrl must be specified.
     */
    label?: string;
    /**
     * The image to display for the action.
     * At least one of label or imageUrl must be specified.
     */
    imageUrl?: string;
}
export { IActionPayload, ACTION_TYPE };
