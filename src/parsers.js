import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (file) => {
  const filename = fs.readFileSync(path.resolve(file), 'utf-8');
  if (path.extname(file) === '.json') {
    return JSON.parse(filename);
  }
  return yaml.load(filename);
};
