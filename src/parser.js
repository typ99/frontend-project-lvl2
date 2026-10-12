import { load } from 'js-yaml';

export const parser = (file, format) => {
    switch (format) {
        case 'json':
            return JSON.parse(file);
        case 'yml':
        case 'yaml':
            return load(file);
        default:
            throw new Error(`Unsupported format: ${format}`);
    }
};
