const INDENT = 4;
const OFFSET = 2;

const indent = (depth) => ' '.repeat(depth * INDENT);
const baseIndent = (depth) => ' '.repeat(depth * INDENT - OFFSET);

const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const renderValue = (value, depth) => {
    if (!isObject(value)) {
        return String(value);
    }

    const lines = Object.entries(value).map(
        ([key, val]) => `${indent(depth + 1)}${key}: ${renderValue(val, depth + 1)}`,
    );

    return ['{', ...lines, `${indent(depth)}}`].join('\n');
};

const renderItems = (items, depth) =>
    items.flatMap(({ key, value, value1, value2, children, status }) => {
        const prefix = baseIndent(depth);

        switch (status) {
            case 'added':
                return `${prefix}+ ${key}: ${renderValue(value, depth)}`;
            case 'removed':
                return `${prefix}- ${key}: ${renderValue(value, depth)}`;
            case 'changed':
                return [
                    `${prefix}- ${key}: ${renderValue(value1, depth)}`,
                    `${prefix}+ ${key}: ${renderValue(value2, depth)}`,
                ];
            case 'nested':
                return [
                    `${prefix}  ${key}: {`,
                    ...renderItems(children, depth + 1),
                    `${indent(depth)}}`,
                ];
            case 'unchanged':
                return `${prefix}  ${key}: ${renderValue(value, depth)}`;
            default:
                throw new Error(`Unknown status: ${status}`);
        }
    });

export const formatStylish = (diff) => ['{', ...renderItems(diff, 1), '}'].join('\n');
