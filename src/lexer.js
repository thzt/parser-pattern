/*
    list : '[' elements ']' ;
    elements : element (',' element)* ;
    element : NAME | list ;

    NAME : ('a'..'z' | 'A'..'Z')+ ;
    WS : ' ' | '\t' | '\n' | '\r' ;
*/

import 'babel-polyfill';

import accumulate from '../util/accumulate';
import Token from '../util/token';

const isWS = c => c === ' ' || c === '\t' || c === '\n' || c === '\r';
const isCOMMA = c => c === ',';
const isLBRACK = c => c === '[';
const isRBRACK = c => c === ']';
const isNAME = c => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');

const actions = [
    { filter: isWS, type: 'WS' },
    { filter: isCOMMA, type: 'COMMA' },
    { filter: isLBRACK, type: 'LBRACK' },
    { filter: isRBRACK, type: 'RBRACK' },
    { filter: isNAME, type: 'NAME' },
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
        const isRecognized = actions.some(({ filter, type }) => {
            const text = accumulate(cursor, filter);
            if (text === '') {
                return false;
            }

            token = new Token(type, text);
            return true;
        });

        if (!isRecognized) {
            throw new Error(`unrecognized characters: ${cursor.source.slice(cursor.position)}`);
        }

        yield token;
    }
};

export default lexer;