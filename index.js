import lexer from './src/lexer';
import parser from './src/parser';

const tokens = lexer('[abc, [def, ghi]]');
const tree = parser(tokens);

console.log(tree.toString());