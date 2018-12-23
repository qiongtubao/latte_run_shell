/// <reference types="node" />
import { ChildProcess } from "child_process";
declare class Shell {
    process: ChildProcess;
    constructor();
    error(error: any): void;
    data(data: any): void;
    export(key: any, value: any): void;
    exec(cmd: any, callback?: any): void;
}
export declare function create(options: any): Shell;
export {};
