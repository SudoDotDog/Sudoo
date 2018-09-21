/**
 * @author WMXPY
 * @namespace Doo
 * @fileoverview Print
 */

import { spaces } from '#/util/string/string';
import * as Colors from 'colors/safe';

export const suggestion = (content: string): string => {
    return spaces(5) + Colors.gray(content);
};
