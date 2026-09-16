import fs from 'node:fs';
import path from 'node:path';
import { parser } from './parser.js';
import { formatStylish } from './stylish.js';

const buildDiff = (data1, data2) => {
    const data1Keys = Object.keys(data1);
    const data2Keys = Object.keys(data2);
    const sortedKeys = [...new Set([...data1Keys, ...data2Keys])].sort();
    const diffItems = sortedKeys.map((key) => {
        if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
            return { key, value: data1[key], status: 'removed' };
        }
        if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
            return { key, value: data2[key], status: 'added' };
        }
        if (data1[key] === data2[key]) {
            return { key, value: data1[key], status: 'unchanged' };
        }

        return { key, value1: data1[key], value2: data2[key], status: 'changed' };
    });

    return diffItems;
};

const genDiff = (filepath1, filepath2) => {
    const file1Ext = path.extname(filepath1).slice(1);
    const file2Ext = path.extname(filepath2).slice(1);
    const content1 = fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8');
    const content2 = fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8');
    const file1Parsed = parser(content1, file1Ext);
    const file2Parsed = parser(content2, file2Ext);
    const diff = buildDiff(file1Parsed, file2Parsed);

    return formatStylish(diff);
};

export default genDiff;
