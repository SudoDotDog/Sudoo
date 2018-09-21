/**
 * @author WMXPY
 * @namespace Common_Agent
 * @fileoverview Interface
 */

export interface IAgent {
    press: (str: string, key: IInput) => IAgent;
    listen: (executable: (key: IInput) => void) => IAgent;
}

export enum SPECIAL_INPUT_NAME {
    ENTER = 'return',
    TAB = 'tab',
    BACKSPACE = 'backspace',
}

export interface IInput {
    sequence: string;
    name?: string | SPECIAL_INPUT_NAME;
    ctrl: boolean;
    meta: boolean;
    shift: boolean;
}
