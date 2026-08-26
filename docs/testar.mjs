/**
 * Confere se TODO exemplo do site roda.
 * Rodar: node docs/testar.mjs
 *
 * Pega o mesmo sandbox que o navegador usa (o trecho de `app.js`) e passa por ele cada
 * bloco de `content.js`. É o que garante duas coisas do padrão do CLAUDE.md: que cada bloco
 * é autossuficiente (roda sozinho, sem depender de outro) e que nada quebra no site.
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
const executar = new Function('esc', trecho + '\nreturn executar;')(String);

globalThis.window = {};
new Function(readFileSync(join(AQUI, 'content.js'), 'utf8')).call(globalThis);

let total = 0, falhas = 0, notas = 0;

for (const curso of globalThis.window.CONTEUDO)
  for (const tema of curso.temas)
    for (const topico of tema.topicos)
      for (const [i, bloco] of topico.blocos.entries()) {
        total++;
        const linhas = [];
        const fim = await new Promise((resolver) => {
          let pronto = false;
          const terminar = (r) => { if (!pronto) { pronto = true; resolver(r); } };
          executar(bloco.codigo, (l) => linhas.push(l), terminar, { arquivo: topico.arquivo });
          setTimeout(() => terminar({ falhou: true, motivo: 'travou' }), LIMITE_MS);
        });

        const onde = `${topico.arquivo} · bloco ${i + 1} (${bloco.titulo})`;
        const nota = linhas.find((l) => l.tipo === 'nota');
        if (nota) { notas++; console.log(`ⓘ  ${onde}\n   ${nota.txt}`); }

        const erros = linhas.filter((l) => l.tipo === 'erro');
        if (erros.length || (fim.falhou && !nota)) {
          falhas++;
          console.log(`✕  ${onde}\n   ${erros.map((e) => e.txt).join('\n   ') || fim.motivo}`);
        }
      }

console.log(`\n${total} blocos · ${falhas} com erro · ${notas} só rodam no terminal`);
process.exit(falhas ? 1 : 0);
