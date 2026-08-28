/**
 * Confere se TODO exemplo do site roda.
 * Rodar: node docs/testar.mjs
 *
 * Pega o mesmo sandbox que o navegador usa (o trecho de `app.js`) e passa por ele cada
 * bloco de `content.js`. É o que garante duas coisas do padrão do CLAUDE.md: que cada bloco
 * é autossuficiente (roda sozinho, sem depender de outro) e que nada quebra no site.
 *
 * Nos tópicos de TypeScript ele roda cada bloco duas vezes: com a versão sem tipos que o
 * build gravou (é a que o site usa) e com a que o removedor do `app.js` produz na hora (é a
 * que o site usa quando o bloco foi editado). As duas têm que imprimir a mesma coisa.
 *
 * ✕ = erro de verdade, tem que consertar.
 * ⓘ = exemplo que depende de algo que só existe no Node (child_process, por exemplo);
 *     o site avisa e manda rodar no terminal. Isso é esperado, não é falha.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const LIMITE_MS = 8000;

// O sandbox vive entre estes dois marcadores do app.js — assim o teste nunca sai de sincronia.
const app = readFileSync(join(AQUI, 'app.js'), 'utf8');
const trecho = app.slice(app.indexOf('/* ═══ Inspeção de valores'), app.indexOf('/* ═══ Terminal'));
const { executar, tirarTipos } = new Function('esc', trecho + '\nreturn { executar, tirarTipos };')(String);

globalThis.window = {};
new Function(readFileSync(join(AQUI, 'content.js'), 'utf8')).call(globalThis);

let total = 0, falhas = 0, notas = 0, divergentes = 0;

/** Roda um trecho no sandbox e devolve as linhas que ele imprimiu. */
const rodar = (codigo, arquivo) => new Promise((resolver) => {
  const linhas = [];
  let pronto = false;
  const terminar = (r) => { if (!pronto) { pronto = true; resolver({ linhas, fim: r }); } };
  executar(codigo, (l) => linhas.push(l), terminar, { arquivo });
  setTimeout(() => terminar({ falhou: true, motivo: 'travou' }), LIMITE_MS);
});

for (const curso of globalThis.window.CONTEUDO)
  for (const tema of curso.temas)
    for (const topico of tema.topicos)
      for (const [i, bloco] of topico.blocos.entries()) {
        total++;
        const { linhas, fim } = await rodar(bloco.codigoJs ?? bloco.codigo, topico.arquivo);
        const onde = `${topico.arquivo} · bloco ${i + 1} (${bloco.titulo})`;
        const nota = linhas.find((l) => l.tipo === 'nota');
        if (nota) { notas++; console.log(`ⓘ  ${onde}\n   ${nota.txt}`); }

        const erros = linhas.filter((l) => l.tipo === 'erro');
        if (erros.length || (fim.falhou && !nota)) {
          falhas++;
          console.log(`✕  ${onde}\n   ${erros.map((e) => e.txt).join('\n   ') || fim.motivo}`);
          continue;
        }

        // TypeScript: o removedor do app.js (usado no código editado) tem que dar o mesmo.
        if (bloco.codigoJs === undefined || nota) continue;
        const edicao = await rodar(tirarTipos(bloco.codigo), topico.arquivo);
        const texto = (ls) => ls.filter((l) => l.tipo !== 'nota').map((l) => `${l.tipo}\u0000${l.txt}`).join('\n');
        if (texto(edicao.linhas) !== texto(linhas)) {
          divergentes++;
          console.log(`≠  ${onde}\n   o removedor do app.js imprime outra coisa:` +
            `\n   build : ${texto(linhas).split('\n')[0] ?? '(nada)'}` +
            `\n   editor: ${texto(edicao.linhas).split('\n')[0] ?? '(nada)'}`);
        }
      }

console.log(`\n${total} blocos · ${falhas} com erro · ${notas} só rodam no terminal` +
  (divergentes ? ` · ${divergentes} divergem do removedor do app.js` : ''));
process.exit(falhas || divergentes ? 1 : 0);
