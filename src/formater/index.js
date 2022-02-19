import stylish from './stylish.js';

export default (getDiff, format) => {
  if (format === 'stylish') {
    return stylish(getDiff);
  }
  throw new Error(`Формат не поддерживается: ${format}`);
};
