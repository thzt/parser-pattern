/*
    list : '[' elements ']' ;
    elements : element (',' element)* ;
    element : NAME | list ;

    NAME : ('a'..'z' | 'A'..'Z')+ ;
    WS : ' ' | '\t' | '\n' | '\r' ;
*/

import filterIterator from '../util/filter-iterator';

const match = (type, nextToken, tokens) => {
    if (nextToken.type !== type) {
        throw new Error(`expect type ${type}, token ${nextToken}`);
    }

    nextToken = tokens.next().value;
    return nextToken;
};

const list = (nextToken, tokens) => {
    nextToken = match('LBRACK', nextToken, tokens);
    nextToken = elements(nextToken, tokens);
    nextToken = match('RBRACK', nextToken, tokens);

    return nextToken;
};

const elements = (nextToken, tokens) => {
    nextToken = element(nextToken, tokens);

    while (true) {
        if (nextToken.type !== 'COMMA') {
            return nextToken;
        }

        nextToken = match('COMMA', nextToken, tokens);
        nextToken = element(nextToken, tokens);
    }
};

const element = (nextToken, tokens) => {
    if (nextToken.type === 'NAME') {
        nextToken = match('NAME', nextToken, tokens);
        return nextToken;
    }

    nextToken = list(nextToken, tokens);
    return nextToken;
};

const parser = tokens => {
    const filteredTokens = filterIterator(tokens, token => token.type !== 'WS');

    let { done, value: nextToken } = filteredTokens.next();
    nextToken = list(nextToken, filteredTokens);
    return nextToken;
};

export default parser;