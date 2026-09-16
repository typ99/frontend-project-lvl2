import path from 'node:path';
import { describe, test, expect } from 'vitest';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(import.meta.dirname, '..', '__fixtures__', filename);

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

describe('genDiff', () => {
    test('compares two flat JSON files', () => {
        const filepath1 = getFixturePath('file1.json');
        const filepath2 = getFixturePath('file2.json');
        expect(genDiff(filepath1, filepath2)).toBe(expected);
    });
});
