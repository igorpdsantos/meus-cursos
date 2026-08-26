// Ponto de entrada do webpack (o `entry` do webpack.config.js).
// Tudo que for importado a partir daqui entra no bundle.js final.

import './assets/css/style.css';   // o css-loader + style-loader injetam isto na página

// Sintaxe moderna de propósito: é o babel-loader que traduz para o JS que
// navegador antigo entende. Olhe o bundle.js gerado para ver o resultado.
const saudacao = (nome = 'visitante') => `Olá, ${nome}!`;

document.addEventListener('DOMContentLoaded', () => {
  const titulo = document.querySelector('.container h1');
  if (titulo) titulo.insertAdjacentHTML('afterend', `<p>${saudacao('Igor')}</p>`);
  console.log('bundle.js carregado');
});
