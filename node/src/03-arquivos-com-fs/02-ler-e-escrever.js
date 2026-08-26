/**
 * fs — ler e escrever arquivos
 * Sessão 3 · Rodar: node src/03-arquivos-com-fs/02-ler-e-escrever.js
 *
 * O QUE É: o módulo interno que mexe no disco: ler arquivo, escrever, listar pasta, apagar.
 * QUANDO USAR: para ler configuração, gravar log, salvar upload, montar relatório em CSV.
 * QUANDO NÃO USAR: como banco de dados. Arquivo não tem busca, nem índice, e dois pedidos
 *                  ao mesmo tempo sobrescrevem um ao outro. Para dados do sistema, MongoDB.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Escrever e ler de volta ───
const { writeFileSync, readFileSync, mkdtempSync } = require('node:fs');
const { join } = require('node:path');
const { tmpdir } = require('node:os');

const pasta = mkdtempSync(join(tmpdir(), 'fs-'));
writeFileSync(join(pasta, 'clientes.txt'), 'Ana\nBruno\nCarla\n');

const conteudo = readFileSync(join(pasta, 'clientes.txt'), 'utf8');   // sem 'utf8' vem um Buffer
console.log('Arquivo tem', conteudo.trim().split('\n').length, 'clientes');
console.log('Primeiro:', conteudo.split('\n')[0]);

// ─── 2) A versão com Promise é a que você usa no servidor ───
const { writeFile, readFile } = require('node:fs/promises');
const { mkdtempSync: criar } = require('node:fs');
const { join: unir } = require('node:path');
const { tmpdir: temp } = require('node:os');

(async () => {
  const dir = criar(unir(temp(), 'fs-async-'));
  await writeFile(unir(dir, 'pedido.txt'), 'Pedido 42 — R$ 250,00');
  console.log('Lido com await:', await readFile(unir(dir, 'pedido.txt'), 'utf8'));
})();
// `readFileSync` TRAVA o processo inteiro enquanto lê. Em um servidor Express isso
// significa nenhum outro visitante ser atendido. Sync só na subida do servidor.

// ─── 3) Guardar objeto: JSON de ida e de volta ───
const { writeFileSync: gravar, readFileSync: ler, mkdtempSync: novaPasta } = require('node:fs');
const { join: montar } = require('node:path');
const { tmpdir: tmp } = require('node:os');

const base = novaPasta(montar(tmp(), 'json-'));
const carrinho = { cliente: 'Ana', itens: [{ nome: 'Teclado', preco: 199.9 }], total: 199.9 };

gravar(montar(base, 'carrinho.json'), JSON.stringify(carrinho, null, 2));   // objeto → texto
const devolta = JSON.parse(ler(montar(base, 'carrinho.json'), 'utf8'));     // texto → objeto

console.log('Cliente:', devolta.cliente, '| total:', devolta.total.toFixed(2));
console.log('Continua sendo objeto?', typeof devolta.itens[0].preco === 'number');

// ═══ NA PRÁTICA ═══

// ─── 4) Acrescentar linha em um log ───
const { appendFileSync, readFileSync: lerLog, mkdtempSync: pastaLog } = require('node:fs');
const { join: caminho } = require('node:path');
const { tmpdir: temporario } = require('node:os');

const dirLog = pastaLog(caminho(temporario(), 'log-'));
const log = caminho(dirLog, 'acessos.log');

for (const rota of ['/', '/contato', '/']) {
  appendFileSync(log, `GET ${rota}\n`);   // append ACRESCENTA; writeFile APAGA e escreve
}
console.log(lerLog(log, 'utf8').trim());
// Trocar appendFileSync por writeFileSync aqui deixaria só a última linha no arquivo.

// ─── 5) Listar uma pasta e filtrar por extensão ───
const { readdirSync, writeFileSync: salvar, mkdtempSync: abrir } = require('node:fs');
const { join: juntar, extname } = require('node:path');
const { tmpdir: pastaTemp } = require('node:os');

const views = abrir(juntar(pastaTemp(), 'views-'));
for (const nome of ['index.ejs', 'contato.ejs', 'style.css']) salvar(juntar(views, nome), '');

const templates = readdirSync(views).filter((f) => extname(f) === '.ejs');
console.log('Templates encontrados:', templates.join(', '));
// É assim que o gerador do site deste curso acha os arquivos de cada tema.

// ─── 6) Criar a pasta antes de escrever ───
const { mkdirSync, writeFileSync: escrever, existsSync, mkdtempSync: raiz } = require('node:fs');
const { join: ligar } = require('node:path');
const { tmpdir: t } = require('node:os');

const projeto = raiz(ligar(t(), 'uploads-'));
const destino = ligar(projeto, 'public', 'uploads', '2026');

mkdirSync(destino, { recursive: true });   // recursive cria a árvore inteira e não reclama se já existe
escrever(ligar(destino, 'nota.txt'), 'ok');
console.log('Pasta criada e arquivo gravado?', existsSync(ligar(destino, 'nota.txt')));
// Sem o mkdir, writeFile estoura com ENOENT: ele cria arquivo, nunca pasta.

// ═══ PEGADINHAS ═══

// ─── 7) Arquivo que não existe: try/catch obrigatório ───
const { readFileSync: tentarLer } = require('node:fs');

try {
  tentarLer('/caminho/que/nao/existe.txt', 'utf8');
} catch (erro) {
  console.log('Código do erro:', erro.code);          // ENOENT = Error NO ENTry
  console.log('Tratado, o servidor continua de pé.');
}
// Sem o try/catch, essa linha derruba o processo inteiro. Um arquivo sumido não pode
// tirar o servidor do ar.

// ─── Resumo ───
// 1. `readFileSync(caminho, 'utf8')` para ler texto — sem o 'utf8' vem Buffer.
// 2. No servidor use `node:fs/promises` com await; Sync só na subida.
// 3. Objeto vira arquivo com `JSON.stringify` e volta com `JSON.parse`.
// 4. `appendFileSync` acrescenta; `writeFileSync` apaga o que estava lá.
// 5. `mkdirSync(caminho, { recursive: true })` antes de escrever em pasta nova.
// 6. Ler arquivo que não existe lança ENOENT; e fs não é banco: sem busca, índice ou disputa.
