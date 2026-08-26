/**
 * Strings: tratamento de texto
 * Sessão 1 · Rodar: node src/01-fundamentos/02-strings.js
 *
 * O QUE É: texto. Em JS a string é imutável — todo método devolve uma string NOVA.
 * QUANDO USAR: nome, e-mail, CPF, slug, mensagem, qualquer dado que o usuário digita.
 * QUANDO NÃO USAR: para guardar número que vai entrar em cálculo. Converta antes.
 */

// ═══ ESSENCIAL ═══

// ─── 1) Limpar o que o usuário digitou ───
const digitado = '   Ana Paula SILVA  ';

console.log(`[${digitado.trim()}]`);              // tira espaço das pontas
console.log(digitado.trim().toLowerCase());
console.log(digitado.trim().toUpperCase());

// ─── 2) Procurar dentro do texto ───
const email = 'ana@empresa.com.br';

console.log('Tem @?    ', email.includes('@'));
console.log('É .br?    ', email.endsWith('.br'));
console.log('Onde é o @:', email.indexOf('@'));   // -1 quando não acha

// ─── 3) Cortar e juntar ───
const nomeCompleto = 'Ana Paula Silva';

console.log(nomeCompleto.split(' '));             // texto → array
console.log(nomeCompleto.split(' ')[0]);          // primeiro nome
console.log(nomeCompleto.slice(0, 3));            // 3 primeiras letras
console.log(`Olá, ${nomeCompleto.split(' ')[0]}!`);

// ═══ NA PRÁTICA ═══

// ─── 4) Iniciais para o avatar ───
const cliente = 'Ana Paula da Silva';
const conectivos = ['de', 'da', 'do', 'dos', 'e'];

const iniciais = cliente
  .split(' ')
  .filter((parte) => !conectivos.includes(parte.toLowerCase()))
  .map((parte) => parte[0])
  .join('');

console.log('Avatar:', iniciais);

// ─── 5) Slug de URL a partir do título ───
const titulo = 'Promoção de Verão: até 50% OFF!';

const slug = titulo
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')   // tira acento
  .replace(/[^a-z0-9]+/g, '-')                        // o que não é letra/número vira hífen
  .replace(/^-|-$/g, '');                             // apara as pontas

console.log('/promo/' + slug);

// ─── 6) Mascarar dado sensível ───
const cartao = '5432123412349876';
console.log('**** **** **** ' + cartao.slice(-4));    // índice negativo = do fim

const cpf = '12345678900';
console.log(cpf.slice(0, 3) + '.***.***-' + cpf.slice(-2));

// ─── 7) Alinhar colunas no relatório ───
const produto = 'Teclado';
const preco = 249.9;

console.log(produto.padEnd(12, '.') + ('R$ ' + preco.toFixed(2)).padStart(10));
console.log('Mouse'.padEnd(12, '.') + 'R$ 89.50'.padStart(10));

// ═══ PEGADINHAS ═══

// ─── 8) String é imutável: o método devolve, não altera ───
const palavra = 'javascript';

palavra.toUpperCase();                    // resultado jogado fora
console.log('Sem guardar:', palavra);
console.log('Guardando: ', palavra.toUpperCase());

// ─── Resumo ───
// 1. Todo método de string devolve uma string nova — guarde o retorno.
// 2. Trate a entrada do usuário na porta: `trim()` e normalize antes de salvar.
// 3. `split` + `join` resolvem a maioria dos "quebrar e remontar".
// 4. Índice negativo em `slice` conta do fim: `slice(-4)` pega os 4 últimos.
// 5. `padEnd`/`padStart` alinham relatório de terminal sem gambiarra.
