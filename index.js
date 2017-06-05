import lexer from './src/lexer';
import parser from './src/parser';

const tokens = lexer('[abc, def]');

parser(tokens);
console.log('ok');