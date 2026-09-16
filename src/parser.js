export const parser = (file, format) => {
    switch (format) {
        case 'json':
            return JSON.parse(file);
        default:
            return;
    }
};
