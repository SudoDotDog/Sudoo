/**
 * @author WMXPY
 * @namespace Script
 * @fileoverview Handler
 */

import { Agent } from "#common/agent";
import { Current } from "#common/agent/current";
import { Canvas } from "#common/canvas";
import { generateSnapshotInfo } from "#common/parse/snapshot";
import { IAgent, IInput, SPECIAL_INPUT_NAME } from "#declare/agent";
import { ICanvas } from "#declare/canvas";
import { END_SIGNAL, ICommand, IPathEnvironment, IService } from "#declare/service";
import { print_header, print_takeingMore } from "#script/print";
import { print_snapshot } from "#script/snapshot";
import { Services } from "#service/services";

export const execute = (
    service: IService,
    command: ICommand,
    env: IPathEnvironment,
): void => {
    const canvas: ICanvas = Canvas.instance;
    const signal: END_SIGNAL = service.execute(command.args, env);

    switch (signal) {
        case END_SIGNAL.FAILED:
        case END_SIGNAL.SUCCEED:
            canvas.enter();
            process.exit(signal);
            return;
        case END_SIGNAL.MORE_ARGS:
            executeWithMoreArgs(service, command, env);
            return;
    }
};

export const executeWithMoreArgs = (
    service: IService,
    command: ICommand,
    env: IPathEnvironment,
): void => {
    const canvas: ICanvas = Canvas.instance;
    const agent: IAgent = Agent.instance;
    const current: Current = new Current()
        .setOnEnter((str: string) => {
            canvas.enter();
            const newCommand: ICommand = {
                ...command,
                args: [...command.args, str],
            };

            execute(service, newCommand, env);
        });
    agent.listen(listenMoreArgsCurrent(current));

    canvas.enter();
    canvas.draw(print_takeingMore(command));
    canvas.enter();
    canvas.draw(print_header());
};

export const listenCommandWithArgsCurrent = (service: Services, current: Current) => {
    const canvas: ICanvas = Canvas.instance;

    return (key: IInput) => {
        const str: string = current.input(key);

        if (key.name === SPECIAL_INPUT_NAME.ENTER) {
            return;
        }

        const snapshot = generateSnapshotInfo(str, service);
        canvas.replace(print_snapshot(snapshot));
    };
};

export const listenMoreArgsCurrent = (current: Current) => {
    const canvas: ICanvas = Canvas.instance;

    return (key: IInput) => {
        const str: string = current.input(key);

        canvas.replace(print_header(str));
    };
};
