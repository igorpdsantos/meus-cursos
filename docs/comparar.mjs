/**
 * Confere se o site mostra a MESMA saída que o `node` daria.
 * Rodar: node docs/comparar.mjs [filtro]      (ex.: node docs/comparar.mjs 04-express)
 *
 * Roda cada bloco duas vezes: uma no Node de verdade (com as bibliotecas de `Node/`, então
 * precisa de `npm install` lá) e outra no sandbox do navegador, extraído do `app.js`.
 * Depois compara as duas saídas, linha por linha.
 *
 * Diferença esperada: blocos que imprimem caminho de arquivo ou nome de usuário — no site
 * eles saem com um caminho fictício — e os que usam `child_process`, que o navegador não tem.
 */
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, '..');
const filtro = process.argv[2] || '';

const app = readFileSync(join(AQUI, 'app.js'), 'utf8');
const trecho = app.slice(app.indexOf('/* ═══ Inspeção de valores'), app.indexOf('/* ═══ Terminal'));
const executar = new Function('esc', trecho + '\nreturn executar;')(String);

globalThis.window = {};
new Function(readFileSync(join(AQUI, 'content.js'), 'utf8')).call(globalThis);

let iguais = 0, diferentes = 0;

for (const curso of globalThis.window.CONTEUDO)
  for (const tema of curso.temas)
    for (const topico of tema.topicos) {
      if (!topico.arquivo.includes(filtro)) continue;
      for (const [i, bloco] of topico.blocos.entries()) {
        // ─── No Node de verdade ───
        const temporario = join(RAIZ, curso.slug, 'src', `_comparando-${i}.js`);
        let noNode;
        try {
          writeFileSync(temporario, bloco.codigo);
          noNode = execFileSync('node', [temporario], { encoding: 'utf8', timeout: 20000, stdio: ['pipe', 'pipe', 'pipe'] });
        } catch (erro) {
          noNode = (erro.stdout || '') + '[ERRO] ' + String(erro.stderr || erro.message).split('\n').slice(0, 3).join(' ');
        } finally {
          try { unlinkSync(temporario); } catch {}
        }

        // ─── No sandbox do site ───
        const linhas = [];
        await new Promise((resolver) => {
          let pronto = false;
          const terminar = () => { if (!pronto) { pronto = true; resolver(); } };
          executar(bloco.codigo, (l) => linhas.push((l.tipo === 'erro' ? '[ERRO] ' : '') + l.txt),
            terminar, { arquivo: topico.arquivo });
          setTimeout(terminar, 9000);
        });

        const noSite = linhas.join('\n').trim();
        if (noSite === noNode.trim()) { iguais++; continue; }
        diferentes++;
        console.log(`\n≠ ${topico.arquivo} · bloco ${i + 1} — ${bloco.titulo}`);
        console.log('  node:', JSON.stringify(noNode.trim()).slice(0, 240));
        console.log('  site:', JSON.stringify(noSite).slice(0, 240));
      }
    }

console.log(`\n${iguais} blocos com saída idêntica · ${diferentes} diferentes`);
