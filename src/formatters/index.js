import { formatStylish } from './stylish.js';
import { formatPlain } from './plain.js';

export const getFormatter = (format) => {
    switch (format) {
        case 'stylish':
            return formatStylish;
        case 'plain':
            return formatPlain;
        default:
            throw new Error(`Unknown format: ${format}`);
    }
};
