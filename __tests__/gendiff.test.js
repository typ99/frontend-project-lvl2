import path from 'node:path';
import { describe, test, expect } from 'vitest';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(import.meta.dirname, '..', '__fixtures__', filename);

const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

describe('genDiff', () => {
    test('compares two JSON files', () => {
        const filepath1 = getFixturePath('nestedFile1.json');
        const filepath2 = getFixturePath('nestedFile2.json');
        expect(genDiff(filepath1, filepath2)).toBe(expected);
    });

    test('compares two YAML files', () => {
        const filepath1 = getFixturePath('nestedFile1.yml');
        const filepath2 = getFixturePath('nestedFile2.yml');
        expect(genDiff(filepath1, filepath2)).toBe(expected);
    });
});
