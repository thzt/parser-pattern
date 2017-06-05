/*
    list : '[' elements ']' ;
    elements : element (',' element)* ;
    element : NAME | list ;

    NAME : ('a'..'z' | 'A'..'Z')+ ;
    WS : ' ' | '\t' | '\n' | '\r' ;
*/

import filterIterator from '../util/filter-iterator';
import SyntaxTree from '../util/syntax-tree';

const match = (type, nextToken, tokens, parent) => {
    if (nextToken.type !== type) {
        throw new Error(`expect type ${type}, token ${nextToken}`);
    }

    const tree = new SyntaxTree(type, nextToken.text, null);
    parent.addSubTree(tree);

    nextToken = tokens.next().value;
    return nextToken;
};

const list = (nextToken, tokens, parent) => {
    const tree = new SyntaxTree('list', null, [])
    parent.addSubTree(tree);

    nextToken = match('LBRACK', nextToken, tokens, tree);
    nextToken = elements(nextToken, tokens, tree);
    nextToken = match('RBRACK', nextToken, tokens, tree);

    return nextToken;
};

const elements = (nextToken, tokens, parent) => {
    const tree = new SyntaxTree('elements', null, []);
    parent.addSubTree(tree);

    nextToken = element(nextToken, tokens, tree);
    while (true) {
        if (nextToken.type !== 'COMMA') {
            return nextToken;
        }

        nextToken = match('COMMA', nextToken, tokens, tree);
        nextToken = element(nextToken, tokens, tree);
    }
};

const element = (nextToken, tokens, parent) => {
    const tree = new SyntaxTree('element', null, []);
    parent.addSubTree(tree);

    if (nextToken.type === 'NAME') {
        nextToken = match('NAME', nextToken, tokens, tree);
        return nextToken;
    }

    nextToken = list(nextToken, tokens, tree);
    return nextToken;
};

const parser = tokens => {
    const filteredTokens = filterIterator(tokens, token => token.type !== 'WS');

    let { done, value: nextToken } = filteredTokens.next();

    const tree = new SyntaxTree('program', null, []);
    nextToken = list(nextToken, filteredTokens, tree);
    return tree;
};

export default parser;