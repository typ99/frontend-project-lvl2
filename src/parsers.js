import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (file) => {
  const filename = fs.readFileSync(path.resolve(file), 'utf-8');
  let parse;
  if (path.extname(file) === '.json') {
    parse = JSON.parse(filename);
  } else if (path.extname(file) === '.yaml' || path.extname(file) === '.yml') {
    parse = yaml.load(filename);
  }
  return parse;
};
