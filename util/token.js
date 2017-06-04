class Token {
    constructor(type, text) {
        const token = this;

        token.type = type;
        token.text = text;
    }

    toString() {
        const token = this;
        const { type, text } = token;

        return `< '${text}', ${type} >`;
    }
};

export default Token;