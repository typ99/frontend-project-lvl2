import fs from 'node:fs';
import path from 'node:path';
import { parser } from './parser.js';

const genDiff = (filepath1, filepath2) => {
    const file1Ext = path.extname(filepath1).slice(1);
    const file2Ext = path.extname(filepath2).slice(1);
    const content1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
    const content2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
    const file1Parsed = parser(content1, file1Ext);
    const file2Parsed = parser(content2, file2Ext);

    return '';
};

export default genDiff;
