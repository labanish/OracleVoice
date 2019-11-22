/**
 * Copyright© 2016, Oracle and/or its affiliates. All rights reserved.
 * @ignore
 */
export interface ILogger {
    debug(...params: any[]): void;
    error(...params: any[]): void;
    info(...params: any[]): void;
    warn(...params: any[]): void;
}
export declare class Logger implements ILogger {
    private module;
    static LOG_LEVEL: {
        NONE: number;
        ERROR: number;
        WARN: number;
        INFO: number;
        DEBUG: number;
    };
    static logLevel: number;
    static appName: string;
    static appVersion: string;
    static historyEnabled: boolean;
    static historySize: number;
    static history: any[];
    constructor(module: string);
    debug(...params: any[]): void;
    error(...params: any[]): void;
    info(...params: any[]): void;
    warn(...params: any[]): void;
    private log;
}
