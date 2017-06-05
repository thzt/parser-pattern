const consume = (cursor, filter) => {
    const character = cursor.source[cursor.position];
    if (!filter(character)) {
        return '';
    }

    cursor.position++;
    return character;
};

export default consume;