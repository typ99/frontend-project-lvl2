import parser from './parsers.js';

const genDiff = (path1, path2) => {
  const data1 = parser(path1);
  const data2 = parser(path2);
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const combData = { ...data1, ...data2 };
  const combDataEntries = Object.entries(combData).sort();
  const result = {};

  /* eslint-disable-next-line */
  for (const [key, value] of combDataEntries) {
    if (data1Keys.includes(key) && data2Keys.includes(key) && data1[key] === value) {
      result[`  ${key}`] = data1[key];
    } else if (!data1Keys.includes(key)) {
      result[`+ ${key}`] = data2[key];
    } else if (data1Keys.includes(key) && data2Keys.includes(key) && data1[key] !== value) {
      result[`- ${key}`] = data1[key];
      result[`+ ${key}`] = data2[key];
    } else if (data1Keys.includes(key) && !data2Keys.includes(key)) {
      result[`- ${key}`] = data1[key];
    }
  }
  const toString = JSON.stringify(result, null, '   ');
  return toString.replace(/["',]/g, '');
};

export default genDiff;
