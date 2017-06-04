const accumulate = (cursor, filter) => {
    const segment = cursor.source.slice(cursor.position);

    const cache = [];
    segment.split('').every(c => {
        if (!filter(c)) {
            return false;
        }

        cache.push(c);
        return true;
    });

    cursor.position += cache.length;
    return cache.join('');
}

export default accumulate;