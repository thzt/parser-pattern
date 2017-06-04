import lexer from './src/lexer';

const tokens = lexer('[abc, def, 0]');
[...tokens].forEach(token => {
    console.log(token.toString());
})