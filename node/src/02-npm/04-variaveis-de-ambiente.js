/**
 * Variáveis de ambiente e o .env
 * Sessão 4 · Rodar: node src/02-npm/04-variaveis-de-ambiente.js
 *
 * O QUE É: `process.env` é o quadro de avisos do sistema operacional para o seu programa.
 *          O pacote `dotenv` copia o arquivo `.env` para dentro desse quadro.
 * QUANDO USAR: para tudo que muda entre a sua máquina e o servidor, e para tudo que é
 *              segredo: senha do banco, chave de API, segredo da sessão, porta.
 * QUANDO NÃO USAR: para configuração que é igual em todo lugar (nome das pastas, rotas) —
 *                  isso é código, não ambiente.
 */

// ═══ ESSENCIAL ═══

// ─── 1) process.env é um objeto comum ───
console.log('Usuário do sistema :', process.env.USER || process.env.USERNAME);
console.log('MINHA_CHAVE existe?:', process.env.MINHA_CHAVE);      // undefined: ninguém definiu

process.env.PORT = '3000';                                          // dá para escrever também
console.log('PORT agora         :', process.env.PORT, '←', typeof process.env.PORT);
// Repare: SEMPRE texto. Não existe número nem booleano em variável de ambiente.

// ─── 2) O padrão porta-com-padrão ───
const porta = process.env.PORT || 3000;   // o servidor de hospedagem define PORT; na sua máquina, 3000
console.log('Servidor subiria em http://localhost:' + porta);
// É a linha mais copiada de todo projeto Node, e por um bom motivo: o mesmo código roda
// na sua máquina e no servidor sem editar nada.

// ─── 3) O que o dotenv faz, sem mistério ───
const { writeFileSync, mkdtempSync, readFileSync } = require('node:fs');
const { join } = require('node:path');
const { tmpdir } = require('node:os');

const pasta = mkdtempSync(join(tmpdir(), 'env-'));
writeFileSync(join(pasta, '.env'), [
  'MONGODB_URI=mongodb+srv://user:senha@cluster0.exemplo.net',
  'SESSION_SECRET=algo-bem-aleatorio',
].join('\n'));

for (const linha of readFileSync(join(pasta, '.env'), 'utf8').split('\n').filter(Boolean)) {
  const [chave, ...resto] = linha.split('=');
  process.env[chave] = resto.join('=');                 // é isto que o dotenv faz: lê e copia
}

console.log('Segredo da sessão  :', process.env.SESSION_SECRET);
console.log('Banco             :', process.env.MONGODB_URI.slice(0, 20) + '...');
// Na vida real: require('dotenv').config();

// ═══ NA PRÁTICA ═══

// ─── 4) A chamada do dotenv é a PRIMEIRA linha do server.js ───
const { writeFileSync: gravar, mkdtempSync: novaPasta } = require('node:fs');
const { join: unir } = require('node:path');
const { tmpdir: temp } = require('node:os');

const projeto = novaPasta(unir(temp(), 'ordem-'));
// src/config/session.js lê process.env no TOPO, na hora em que é carregado:
const config = `
  const segredo = process.env.SEGREDO_DA_SESSAO;   // lido AGORA, quando o arquivo é carregado
  module.exports = { segredo, ok: Boolean(segredo) };
`;
gravar(unir(projeto, 'session.js'), config);
gravar(unir(projeto, 'session-bis.js'), config);            // o mesmo arquivo, outro nome

console.log('require antes do dotenv →', require(unir(projeto, 'session.js')));

process.env.SEGREDO_DA_SESSAO = 'algo-bem-aleatorio';       // é o que require('dotenv').config() faz
console.log('require depois do .env  →', require(unir(projeto, 'session-bis.js')));
// Por isso `require('dotenv').config()` é a linha 1 do server.js: qualquer require acima
// dele lê process.env vazio e derruba o servidor com "SESSION_SECRET não encontrada".

// ─── 5) Falhar cedo quando a variável não existe ───
function carregar(nome) {
  const valor = process.env[nome];
  if (!valor) throw new Error(`${nome} não encontrada. Confira o arquivo .env na raiz do projeto.`);
  return valor;
}

process.env.MONGODB_DBNAME = 'cursojs01';
console.log('Banco configurado  :', carregar('MONGODB_DBNAME'));

try {
  carregar('MONGODB_URI_QUE_NAO_EXISTE');
} catch (erro) {
  console.log('Erro claro na subida:', erro.message);
}
// Melhor o servidor nem subir do que subir e falhar na primeira requisição do usuário.

// ─── 6) O .env nunca vai para o repositório ───
console.log('.gitignore:', ['node_modules/', '.env'].join('  '));
console.log('Vai para o git um .env.example, com as chaves e SEM os valores:');
console.log(['MONGODB_URI=', 'MONGODB_DBNAME=', 'SESSION_SECRET='].join('\n'));
// Assim quem clona sabe o que precisa preencher sem receber a sua senha junto.

// ═══ PEGADINHAS ═══

// ─── 7) Tudo é texto ───
process.env.MODO_DEBUG = 'false';
process.env.MAX_ITENS = '10';

console.log('if (env.MODO_DEBUG)   →', Boolean(process.env.MODO_DEBUG), '← string cheia é sempre true');
console.log('env.MODO_DEBUG === "true" →', process.env.MODO_DEBUG === 'true');
console.log('Somando sem converter →', process.env.MAX_ITENS + 1);           // "101"
console.log('Convertendo antes     →', Number(process.env.MAX_ITENS) + 1);   // 11

// ─── Resumo ───
// 1. `process.env` é a configuração que vem de fora do código; dotenv copia o .env para lá.
// 2. `require('dotenv').config()` na PRIMEIRA linha do server.js.
// 3. Segredo (senha do banco, SESSION_SECRET) nunca no código: sempre no .env.
// 4. .env no .gitignore; .env.example, sem valores, no repositório.
// 5. Todo valor é string: compare com === 'true' e converta com Number() antes de somar.
// 6. Valide na subida e derrube o processo se faltar algo — erro cedo é erro barato.
