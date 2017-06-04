import lexer from './src/lexer';

const tokens = lexer('[abc, def]');
[...tokens].forEach(token => {
    console.log(token.toString());
})