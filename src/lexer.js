/*
    list : '[' elements ']' ;
    elements : element (',' element)* ;
    element : NAME | list ;

    NAME : ('a'..'z' | 'A'..'Z')+ ;
    WS : ' ' | '\t' | '\n' | '\r' ;
*/

import 'babel-polyfill';

import accumulate from '../util/accumulate';
import consume from '../util/consume';
import Token from '../util/token';

const isWS = c => c === ' ' || c === '\t' || c === '\n' || c === '\r';
const isCOMMA = c => c === ',';
const isLBRACK = c => c === '[';
const isRBRACK = c => c === ']';
const isNAME = c => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');

const actions = [
    { filter: isWS, type: 'WS', isAccumulate: true },
    { filter: isCOMMA, type: 'COMMA', isAccumulate: false },
    { filter: isLBRACK, type: 'LBRACK', isAccumulate: false },
    { filter: isRBRACK, type: 'RBRACK', isAccumulate: false },
    { filter: isNAME, type: 'NAME', isAccumulate: true },
];

const lexer = function* (input) {
    const cursor = {
        source: input,
        position: 0
    };

    while (true) {
        if (cursor.position === cursor.source.length) {
            return;
        }

        let token;
        const isRecognized = actions.some(({ filter, type, isAccumulate }) => {
            const handler = isAccumulate ? accumulate : consume;

            const text = handler(cursor, filter);
            if (text === '') {
                return false;
            }

            token = new Token(type, text);
            return true;
        });

        if (!isRecognized) {
            throw new Error(`unrecognized characters: ${cursor.source.slice(cursor.position)}, at position: ${cursor.position}`);
        }

        yield token;
    }
};

export default lexer;