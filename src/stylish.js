const renderItem = ({ key, value, value1, value2, status }) => {
    switch (status) {
        case 'added':
            return `  + ${key}: ${value}`;
        case 'removed':
            return `  - ${key}: ${value}`;
        case 'changed':
            return [`  - ${key}: ${value1}`, `  + ${key}: ${value2}`];
        default:
            return `    ${key}: ${value}`;
    }
};

export const formatStylish = (diff) => {
    const lines = diff.flatMap(renderItem);
    return `{\n${lines.join('\n')}\n}`;
};
