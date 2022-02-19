import _ from 'lodash';
import parser from './parsers.js';
import format from './formater/index.js';

const createTree = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj1.hasOwnProperty(key)) {
      return ['add', { key, val: obj2[key] }];
    }
    // eslint-disable-next-line no-prototype-builtins
    if (!obj2.hasOwnProperty(key)) {
      return ['remove', { key, val: obj1[key] }];
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return ['recursion', { key, val: createTree(obj1[key], obj2[key]) }];
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return ['same', { key, val: obj1[key] }];
    }
    return ['updated', { key, val1: obj1[key], val2: obj2[key] }];
  });
};

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const file1 = parser(filepath1);
  const file2 = parser(filepath2);
  const tree = createTree(file1, file2);
  return format(tree, formatType);
};
export default genDiff;
