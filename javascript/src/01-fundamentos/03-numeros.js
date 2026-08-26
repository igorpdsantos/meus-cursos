/**
 * Números: Math e Number
 * Sessão 1 · Rodar: node src/01-fundamentos/03-numeros.js
 *
 * O QUE É: número em JS é sempre decimal (float). Não existe tipo "inteiro" separado.
 * QUANDO USAR: Math para arredondar, sortear e achar maior/menor. Number para converter.
 * QUANDO NÃO USAR: para dinheiro em sistema financeiro sério — trabalhe em centavos (inteiro).
 */

// ═══ ESSENCIAL ═══

// ─── 1) Converter: o formulário sempre entrega texto ───
const qtdDigitada = '3';
const precoDigitado = '19,90';

console.log(Number(qtdDigitada) + 1);                         // 4
console.log(Number(precoDigitado));                           // NaN — a vírgula quebra
console.log(parseFloat(precoDigitado.replace(',', '.')));     // 19.9

// ─── 2) Validar antes de calcular ───
const entrada = 'abc';
const numero = Number(entrada);

console.log('É NaN?     ', Number.isNaN(numero));
console.log('É inteiro? ', Number.isInteger(Number('2.5')));
console.log('É inteiro? ', Number.isInteger(Number('4')));

// ─── 3) Arredondar: cada um serve para uma coisa ───
console.log('round (mais perto):', Math.round(2.5), Math.round(2.4));
console.log('floor (pra baixo): ', Math.floor(2.9));   // páginas, índices
console.log('ceil  (pra cima):  ', Math.ceil(2.1));    // caixas, entregas
console.log('toFixed (exibir):  ', (2.567).toFixed(2));

// ═══ NA PRÁTICA ═══

// ─── 4) Total com frete e desconto ───
const subtotal = 428.9;
const frete = subtotal >= 300 ? 0 : 24.9;
const desconto = subtotal * 0.1;

console.log('Subtotal: R$', subtotal.toFixed(2));
console.log('Desconto: R$', desconto.toFixed(2));
console.log('Frete:    R$', frete.toFixed(2));
console.log('Total:    R$', (subtotal - desconto + frete).toFixed(2));

// ─── 5) Maior, menor e média ───
const notas = [7.5, 9, 6, 10, 8.5];

console.log('Maior:', Math.max(...notas));   // ... espalha o array em argumentos
console.log('Menor:', Math.min(...notas));
console.log('Média:', (notas.reduce((a, b) => a + b, 0) / notas.length).toFixed(1));

// ─── 6) Sortear um brinde ───
const participantes = ['Ana', 'Bruno', 'Carla', 'Diego'];
const sorteado = participantes[Math.floor(Math.random() * participantes.length)];

console.log('Ganhador:', sorteado);   // floor + length nunca estoura o array

// ═══ PEGADINHAS ═══

// ─── 7) 0.1 + 0.2 não dá 0.3 ───
console.log(0.1 + 0.2);                 // 0.30000000000000004
console.log((0.1 + 0.2).toFixed(2));    // como exibir
console.log((10 + 20) / 100);           // como calcular: em centavos

// ─── 8) toFixed devolve STRING ───
const valor = (19.9).toFixed(2);

console.log(typeof valor);
console.log(valor + 10);            // '19.9010' — concatenou!
console.log(Number(valor) + 10);    // 29.9 — converta de volta para somar

// ─── Resumo ───
// 1. Tudo de formulário é texto: converta com `Number`/`parseFloat` antes de calcular.
// 2. Valide com `Number.isNaN` e `Number.isInteger` — nunca confie no que chegou.
// 3. `floor` pra baixo, `ceil` pra cima, `round` pro mais perto, `toFixed` só pra exibir.
// 4. Dinheiro dá erro de centavo: guarde em centavos (inteiro) e divida só ao mostrar.
// 5. `toFixed` devolve string — o `+` vira concatenação se você esquecer.
