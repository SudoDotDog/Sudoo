/**
 * @author WMXPY
 * @namespace Test_Common_Canvas
 * @fileoverview Class
 */

require('../../src/binding');
import { Canvas } from '#common/canvas';
import { expect } from 'chai';
import * as Chance from 'chance';
import { MockWriteableStream } from '../mock/node/writeable';

describe('Given Canvas common class', function (this: Mocha.Suite): void {
    const chance: Chance.Chance = new Chance('common-canvas-test');

    it('should draw logs to terminal', () => {
        const stream = new MockWriteableStream();
        const canvas = new Canvas(stream.flush());

        canvas.draw(chance.string());

        const result: string[] = stream.result();
        expect(result).to.be.lengthOf(1);
    });
});
