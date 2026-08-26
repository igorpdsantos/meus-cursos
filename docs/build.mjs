/**
 * Gerador do site de documentação.
 * Rodar: node docs/build.mjs
 *
 * Lê todos os arquivos de <CURSO>/src/**, extrai o cabeçalho e os blocos numerados,
 * e escreve docs/content.js. O código dos .js continua sendo a única fonte da verdade.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, dirname, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ─── Os cursos, na ordem em que se estuda ───
// A trilha é sequencial: Node só faz sentido depois de JavaScript, porque Node É JavaScript
// — só que rodando fora do navegador. `depoisDe` é o que o site mostra como pré-requisito.
const CURSOS = {
  javascript: {
    titulo: 'JavaScript',
    selo: 'JS',
    subtitulo: 'A linguagem',
    ordem: 1,
    cor: '#f5d76e',
    resumo: 'A base de tudo: variável, texto, lista, objeto, função, assíncrono e classe. ' +
      'O mesmo JavaScript que roda no navegador e no servidor.',
    depoisDe: null,
  },
  node: {
    titulo: 'Node',
    selo: 'N',
    subtitulo: 'JavaScript no servidor',
    ordem: 2,
    cor: '#6ee7a8',
    resumo: 'A mesma linguagem, fora do navegador: módulos, npm, arquivos, Express, ' +
      'MongoDB e sessão. Aqui o JavaScript ganha porta, rota e banco de dados.',
    depoisDe: 'javascript',
    exigencia: 'Continua o curso de JavaScript. A linguagem é a mesma — o que muda é onde ' +
      'ela roda e o que ela passa a alcançar: disco, rede e banco de dados.',
  },
};

// ─── Aparência de cada tema (só cosmético; tema novo cai no padrão) ───
// A chave pode ser `<curso>/<tema>` ou só `<tema>` (vale para qualquer curso).
const TEMAS = {
  'javascript/01-fundamentos':       { titulo: 'Fundamentos',        icone: '◆', cor: '#f2c14e', resumo: 'Variáveis, texto e número — a base de tudo.' },
  'javascript/02-arrays-e-objetos':  { titulo: 'Arrays e Objetos',   icone: '▤', cor: '#5ec8d8', resumo: 'Guardar e acessar coleções de dados.' },
  'javascript/03-controle-de-fluxo': { titulo: 'Controle de Fluxo',  icone: '⇄', cor: '#b48ef0', resumo: 'Repetir, decidir e lidar com erro.' },
  'javascript/04-funcoes':           { titulo: 'Funções',            icone: 'ƒ', cor: '#6ee7a8', resumo: 'Dar nome a um pedaço de lógica e reaproveitar.' },
  'javascript/05-transformar-listas':{ titulo: 'Transformar Listas', icone: '≡', cor: '#ff9e6d', resumo: 'filter, map e reduce — o trio do dia a dia.' },
  'javascript/06-assincrono':        { titulo: 'Assíncrono',         icone: '◷', cor: '#79c0ff', resumo: 'Código que roda depois, sem travar o resto.' },
  'javascript/07-extras':            { titulo: 'Extras e Legado',    icone: '◇', cor: '#8b95a8', resumo: 'Bom conhecer, raro escrever hoje.' },
  'javascript/08-classes':           { titulo: 'Classes',            icone: '⬢', cor: '#f78fb3', resumo: 'O molde de objetos do JS moderno.' },

  'node/01-modulos':            { titulo: 'Módulos',            icone: '▤', cor: '#6ee7a8', resumo: 'Quebrar o programa em arquivos: require, module.exports e os módulos internos.' },
  'node/02-npm':                { titulo: 'npm',                icone: '⬢', cor: '#f2c14e', resumo: 'package.json, dependências e scripts.' },
  'node/03-arquivos-com-fs':    { titulo: 'Arquivos com fs',    icone: '🗀', cor: '#5ec8d8', resumo: 'Ler, escrever e percorrer pastas no disco.' },
  'node/04-express':            { titulo: 'Express',            icone: '⇄', cor: '#b48ef0', resumo: 'Servidor, rotas, views e middlewares.' },
  'node/05-mongodb':            { titulo: 'MongoDB',            icone: '◍', cor: '#79c0ff', resumo: 'Conectar no banco e salvar dados com Model.' },
  'node/06-sessao-e-seguranca': { titulo: 'Sessão e Segurança', icone: '⚿', cor: '#f78fb3', resumo: 'Session, flash, CSRF e Helmet.' },
  'node/07-extras':             { titulo: 'Extras',             icone: '◇', cor: '#8b95a8', resumo: 'Bom conhecer: fora da trilha do curso.' },
};

const PADRAO = { icone: '●', cor: '#8b95a8' };

const titulizar = (slug) =>
  slug.replace(/^\d+-/, '').split('-')
    .map((p, i) => (i > 0 && ['de', 'da', 'do', 'e', 'em'].includes(p) ? p : p[0].toUpperCase() + p.slice(1)))
    .join(' ');

/** Extrai um campo do cabeçalho, juntando as linhas de continuação. */
function campo(linhas, chave) {
  const i = linhas.findIndex((l) => l.startsWith(chave + ':'));
  if (i === -1) return '';
  let txt = linhas[i].slice(chave.length + 1).trim();
  for (let j = i + 1; j < linhas.length; j++) {
    if (/^[A-ZÀ-Ú ]+:/.test(linhas[j]) || !linhas[j].trim()) break;
    txt += ' ' + linhas[j].trim();
  }
  return txt.replace(/\s+/g, ' ').trim();
}

function parseArquivo(caminhoAbs, cursoDir) {
  const bruto = readFileSync(caminhoAbs, 'utf8');
  const fim = bruto.indexOf('*/');
  const cabecalho = bruto.slice(0, fim);
  const corpo = bruto.slice(fim + 2).replace(/^\n+/, '');

  const linhas = cabecalho.split('\n').map((l) => l.replace(/^\s*\/?\*+ ?/, '').trimEnd());
  const titulo = linhas.find((l) => l.trim())?.trim() ?? basename(caminhoAbs);
  const sessao = Number(cabecalho.match(/Sessão (\d+)/)?.[1] ?? 0);

  // ─── Quebra o corpo em seções (`// ═══ NOME ═══`) e blocos (`// ─── N) Título ───`) ───
  const SECAO = /^\/\/ ═══+ ?(.+?) ?═══+\s*$/;
  const MARCA = /^\/\/ ───+ ?(.+?) ?───+\s*$/;
  const partes = [];
  let secaoAtual = 'ESSENCIAL';
  let atual = { titulo: null, secao: secaoAtual, linhas: [] };
  for (const linha of corpo.split('\n')) {
    const s = linha.match(SECAO);
    if (s) { secaoAtual = s[1]; continue; }
    const m = linha.match(MARCA);
    if (m) { partes.push(atual); atual = { titulo: m[1], secao: secaoAtual, linhas: [] }; }
    else atual.linhas.push(linha);
  }
  partes.push(atual);

  const preambulo = partes.shift().linhas.join('\n').trim();
  if (preambulo) {
    console.warn(`⚠ ${basename(caminhoAbs)}: há código antes do 1º bloco. Cada bloco deve ser
   autossuficiente — mova esses dados para dentro do bloco que os usa.`);
  }
  const blocos = [];
  let resumo = [];

  for (const p of partes) {
    const codigo = p.linhas.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    if (/^resumo$/i.test(p.titulo)) {
      resumo = codigo.split('\n')
        .map((l) => l.replace(/^\/\/ ?/, '').trim())
        .filter(Boolean)
        .map((l) => l.replace(/^\d+\.\s*/, ''));
      continue;
    }
    const m = p.titulo.match(/^(\d+)\)\s*(.+)$/);
    blocos.push({ n: m ? Number(m[1]) : blocos.length + 1, titulo: m ? m[2] : p.titulo, secao: p.secao, codigo });
  }

  return {
    slug: basename(caminhoAbs, '.js'),
    arquivo: relative(ROOT, caminhoAbs),
    comando: `node ${relative(cursoDir, caminhoAbs)}`,
    titulo, sessao,
    oQueE: campo(linhas, 'O QUE É'),
    quandoUsar: campo(linhas, 'QUANDO USAR'),
    quandoNaoUsar: campo(linhas, 'QUANDO NÃO USAR'),
    preambulo, blocos, resumo,
  };
}

// ─── Varre os cursos (cada pasta da raiz com um src/ dentro) ───
const cursos = [];
for (const cursoSlug of readdirSync(ROOT).sort()) {
  const src = join(ROOT, cursoSlug, 'src');
  if (!statSync(join(ROOT, cursoSlug), { throwIfNoEntry: false })?.isDirectory()) continue;
  if (!statSync(src, { throwIfNoEntry: false })?.isDirectory()) continue;

  const temas = readdirSync(src).sort()
    .filter((t) => statSync(join(src, t)).isDirectory())
    .map((temaSlug) => {
      const meta = TEMAS[`${cursoSlug}/${temaSlug}`] ?? TEMAS[temaSlug] ?? { ...PADRAO, titulo: titulizar(temaSlug) };
      const topicos = readdirSync(join(src, temaSlug)).sort()
        .filter((f) => f.endsWith('.js'))
        .map((f) => parseArquivo(join(src, temaSlug, f), join(ROOT, cursoSlug)));
        return { slug: temaSlug, ...meta, titulo: meta.titulo ?? titulizar(temaSlug), topicos };
    })
    .filter((t) => t.topicos.length);

  const meta = CURSOS[cursoSlug] ?? { titulo: cursoSlug, selo: cursoSlug.slice(0, 2).toUpperCase(), ordem: 99, cor: PADRAO.cor };
  if (temas.length) cursos.push({ slug: cursoSlug, ...meta, temas });
}

cursos.sort((a, b) => (a.ordem ?? 99) - (b.ordem ?? 99));

const total = cursos.reduce((a, c) => a + c.temas.reduce((b, t) => b + t.topicos.length, 0), 0);
writeFileSync(
  join(ROOT, 'docs', 'content.js'),
  '/* GERADO por docs/build.mjs — não edite à mão. Edite os .js em <CURSO>/src/ e rode o build. */\n' +
    'window.CONTEUDO = ' + JSON.stringify(cursos, null, 1) + ';\n',
);
console.log('  trilha: ' + cursos.map((c) => `${c.titulo} (${c.temas.length} temas, ` +
  `${c.temas.reduce((a, t) => a + t.topicos.length, 0)} tópicos)`).join('  →  '));
console.log(`✓ docs/content.js — ${cursos.length} curso(s), ${total} tópicos, ` +
  `${cursos.flatMap((c) => c.temas.flatMap((t) => t.topicos)).reduce((a, t) => a + t.blocos.length, 0)} blocos`);
