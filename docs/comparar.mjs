/**
 * Confere se o site mostra a MESMA saída que o `node` daria.
 * Rodar: node docs/comparar.mjs [filtro]      (ex.: node docs/comparar.mjs 04-express)
 *
 * Roda cada bloco duas vezes: uma no Node de verdade (com as bibliotecas de `node/`, então
 * precisa de `npm install` lá) e outra no sandbox do navegador, extraído do `app.js`.
 * Depois compara as duas saídas, linha por linha.
 *
 * Nem toda diferença é defeito, então o resultado sai em quatro grupos:
 *   ✓ igual       — o site mostra exatamente o que o node mostra
 *   ~ instável    — o próprio node dá saídas diferentes a cada rodada (sorteio, tempo em ms)
 *   ⌨ só terminal — usa módulo que o navegador não tem, e o site avisa isso em vez de fingir
 *   ≠ diferente   — divergência de verdade, para investigar
 */
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, '..');
const filtro = process.argv[2] || '';

// O sandbox mostra de propósito um caminho e um usuário fictícios, porque no navegador não
// existe disco nem conta de sistema. Alinhamos os dois lados antes de comparar.
const CASA_FICTICIA = '/Users/igor';
const RAIZ_FICTICIA = CASA_FICTICIA + '/Cursos';
const USUARIO = process.env.USER || process.env.LOGNAME || '';
const normalizar = (txt, arquivo, i) => {
  let s = txt.replaceAll(RAIZ, RAIZ_FICTICIA)
             .replaceAll(homedir(), CASA_FICTICIA)
             .replaceAll(`_comparando-${i}.js`, basename(arquivo))
             .replaceAll(`_comparando-${i}.ts`, basename(arquivo));
  // process.env.USER: no navegador não existe conta de sistema, e o sandbox responde "igor".
  if (USUARIO.length > 2) s = s.replaceAll(USUARIO, 'igor');
  return s;
};

const app = readFileSync(join(AQUI, 'app.js'), 'utf8');
const trecho = app.slice(app.indexOf('/* ═══ Inspeção de valores'), app.indexOf('/* ═══ Terminal'));
const { executar } = new Function('esc', trecho + '\nreturn { executar };')(String);

globalThis.window = {};
new Function(readFileSync(join(AQUI, 'content.js'), 'utf8')).call(globalThis);

let iguais = 0, instaveis = 0, soTerminal = 0, diferentes = 0;

for (const curso of globalThis.window.CONTEUDO)
  for (const tema of curso.temas)
    for (const topico of tema.topicos) {
      if (!topico.arquivo.includes(filtro)) continue;
      for (const [i, bloco] of topico.blocos.entries()) {
        // ─── No Node de verdade ───
        // O temporário nasce na pasta DO TÓPICO e roda com a raiz do curso como cwd: é assim
        // que o README manda rodar, e é o que o sandbox imita. Fora daí, __dirname e cwd
        // sairiam diferentes por culpa do teste, não do site.
        const pastaTopico = join(RAIZ, dirname(topico.arquivo));
        // O temporário nasce com a extensão do próprio tópico: `.ts` o node roda tirando os
        // tipos sozinho, e é justamente esse caminho que se quer comparar.
        const ext = topico.arquivo.endsWith('.ts') ? 'ts' : 'js';
        const flag = topico.comando.includes('--experimental-transform-types')
          ? ['--experimental-transform-types', '--no-warnings'] : [];
        const temporario = join(pastaTopico, `_comparando-${i}.${ext}`);
        const rodarNoNode = () => {
          try {
            writeFileSync(temporario, bloco.codigo);
            return execFileSync('node', [...flag, temporario], {
              encoding: 'utf8', timeout: 20000, cwd: join(RAIZ, curso.slug), stdio: ['pipe', 'pipe', 'pipe'],
            });
          } catch (erro) {
            return (erro.stdout || '') + '[ERRO] ' + String(erro.stderr || erro.message).split('\n').slice(0, 3).join(' ');
          } finally {
            try { unlinkSync(temporario); } catch {}
          }
        };
        const noNode = normalizar(rodarNoNode(), topico.arquivo, i).trim();

        // ─── No sandbox do site ───
        const linhas = [];
        let motivo = null;
        await new Promise((resolver) => {
          let pronto = false;
          const terminar = (fim) => { if (!pronto) { pronto = true; motivo = fim?.motivo ?? null; resolver(); } };
          executar(bloco.codigoJs ?? bloco.codigo, (l) => linhas.push((l.tipo === 'erro' ? '[ERRO] ' : '') + l.txt),
            terminar, { arquivo: topico.arquivo });
          setTimeout(terminar, 9000);
        });
        const noSite = linhas.join('\n').trim();

        if (noSite === noNode) { iguais++; continue; }

        const onde = `${topico.arquivo} · bloco ${i + 1} — ${bloco.titulo}`;

        // O sandbox avisou que o exemplo só roda no terminal: é a resposta honesta, não erro.
        if (motivo === 'nota') { soTerminal++; console.log(`⌨ ${onde}`); continue; }

        // Antes de acusar o site, confere se o node repete a própria saída. Se não repete, o
        // bloco é instável por natureza (Math.random, tempo em ms) e byte a byte não diz nada.
        // Cinco rodadas porque um sorteio entre poucas opções repete com facilidade em duas.
        let instavel = false;
        for (let volta = 0; volta < 5 && !instavel; volta++)
          instavel = normalizar(rodarNoNode(), topico.arquivo, i).trim() !== noNode;
        if (instavel) { instaveis++; console.log(`~ ${onde}`); continue; }

        diferentes++;
        console.log(`\n≠ ${onde}`);
        console.log('  node:', JSON.stringify(noNode).slice(0, 240));
        console.log('  site:', JSON.stringify(noSite).slice(0, 240));
      }
    }

console.log(`\n${iguais} iguais · ${instaveis} instáveis · ${soTerminal} só no terminal · ${diferentes} diferentes`);
process.exitCode = diferentes ? 1 : 0;
