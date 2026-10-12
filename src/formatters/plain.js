const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const stringifyValue = (value) => {
    if (isObject(value)) {
        return '[complex value]';
    }
    if (typeof value === 'string') {
        return `'${value}'`;
    }
    return String(value);
};

const renderItems = (items, parentPath) =>
    items.flatMap(({ key, value, value1, value2, children, status }) => {
        const fullPath = parentPath ? `${parentPath}.${key}` : key;

        switch (status) {
            case 'added':
                return `Property '${fullPath}' was added with value: ${stringifyValue(value)}`;
            case 'removed':
                return `Property '${fullPath}' was removed`;
            case 'changed':
                return `Property '${fullPath}' was updated. From ${stringifyValue(value1)} to ${stringifyValue(value2)}`;
            case 'nested':
                return renderItems(children, fullPath);
            case 'unchanged':
                return [];
            default:
                throw new Error(`Unknown status: ${status}`);
        }
    });

export const formatPlain = (diff) => renderItems(diff, '').join('\n');
