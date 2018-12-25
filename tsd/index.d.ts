/// <reference types="node" />
import { ChildProcess } from "child_process";
declare class Shell {
    process: ChildProcess;
    onData: Function;
    caches: any[];
    constructor();
    error(error: any): void;
    data(data: any): void;
    export(key: any, value: any): void;
    exec(cmd: any, callback?: any): this;
}
export declare function create(options: any): Shell;
export {};
