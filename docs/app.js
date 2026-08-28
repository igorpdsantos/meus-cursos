/* Documentação interativa — motor da aplicação. Zero dependências. */
'use strict';

const CURSOS = window.CONTEUDO || [];
const $ = (s, r = document) => r.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ═══ Memória local (progresso, edições, tema) ═══════════════════ */
const guardar = (k, v) => { try { localStorage.setItem('cursos:' + k, JSON.stringify(v)); } catch {} };
const puxar = (k, padrao) => { try { return JSON.parse(localStorage.getItem('cursos:' + k)) ?? padrao; } catch { return padrao; } };

let feitos = new Set(puxar('feitos', []));
let edicoes = puxar('edicoes', {});

/* ═══ Índice achatado ════════════════════════════════════════════ */
const TODOS = [];
for (const curso of CURSOS)
  for (const tema of curso.temas)
    for (const topico of tema.topicos)
      TODOS.push({ ...topico, curso, tema, id: `${curso.slug}/${tema.slug}/${topico.slug}` });
TODOS.forEach((t, i) => { t.anterior = TODOS[i - 1]; t.proximo = TODOS[i + 1]; });
const porId = new Map(TODOS.map((t) => [t.id, t]));

const nomeDoCurso = (slug) => CURSOS.find((c) => c.slug === slug)?.titulo ?? slug;

/* ═══ Realce de sintaxe ══════════════════════════════════════════ */
const PALAVRAS = new Set(['const','let','var','function','return','if','else','for','of','in','while','do','break','continue','switch','case','default','try','catch','finally','throw','new','delete','typeof','instanceof','class','extends','super','this','yield','async','await','void','get','set','static','from','import','export']);
const LITERAIS = new Set(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity']);

/** Tokeniza sem regex aninhada: comentário → string → número → palavra. */
function realcar(codigo) {
  const REGRA = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*")|(\b\d[\d_]*(?:\.\d+)?(?:e[+-]?\d+)?\b)|([A-Za-z_$][\w$]*)/g;
  let saida = '', fim = 0, m;
  while ((m = REGRA.exec(codigo))) {
    saida += esc(codigo.slice(fim, m.index));
    fim = m.index + m[0].length;
    const [, comentario, texto, numero, palavra] = m;
    if (comentario) saida += `<span class="hl-com">${esc(comentario)}</span>`;
    else if (texto) saida += `<span class="hl-str">${esc(texto)}</span>`;
    else if (numero) saida += `<span class="hl-num">${esc(numero)}</span>`;
    else {
      const antes = codigo[m.index - 1];
      const depois = codigo.slice(fim).match(/^\s*(.)/)?.[1];
      let cls = '';
      if (PALAVRAS.has(palavra)) cls = 'hl-kw';
      else if (LITERAIS.has(palavra)) cls = 'hl-dec';
      else if (depois === '(') cls = 'hl-fn';
      else if (antes !== '.' && /^[A-Z]/.test(palavra)) cls = 'hl-cls';
      saida += cls ? `<span class="${cls}">${esc(palavra)}</span>` : esc(palavra);
    }
  }
  return saida + esc(codigo.slice(fim));
}

/** Marca `crase` como <code> em textos de documentação. */
const marcarCodigo = (t) => esc(t).replace(/`([^`]+)`/g, '<code>$1</code>');

/* ═══ Inspeção de valores (imita a saída do node) ════════════════ */
/* O node lê o estado de uma Promise por dentro do V8; no navegador isso não existe. Então o
   sandbox entrega ao exemplo uma Promise instrumentada, que anota o próprio estado aqui. */
const ESTADO_PROMESSA = new WeakMap();

function inspecionar(v, prof = 0, vistos = new Set()) {
  if (typeof v === 'string') return prof === 0 ? v : `'${v.replace(/'/g, "\\'")}'`;
  if (typeof v === 'number' || typeof v === 'boolean' || v === null || v === undefined) return String(v);
  if (typeof v === 'bigint') return v + 'n';
  if (typeof v === 'symbol') return v.toString();
  if (typeof v === 'function') return v.name ? `[Function: ${v.name}]` : '[Function (anonymous)]';
  if (v instanceof Error) return `${v.name}: ${v.message}`;
  if (v instanceof Promise) {
    const reg = ESTADO_PROMESSA.get(v);
    if (!reg || reg.estado === 'pendente') return 'Promise { <pending> }';
    const dentro = inspecionar(reg.valor, prof + 1, new Set(vistos).add(v));
    return reg.estado === 'rejeitada' ? `Promise { <rejected> ${dentro} }` : `Promise { ${dentro} }`;
  }
  if (vistos.has(v)) return '[Circular *1]';
  if (prof > 4) return Array.isArray(v) ? '[Array]' : '[Object]';

  vistos = new Set(vistos).add(v);
  const filho = (x) => inspecionar(x, prof + 1, vistos);
  let itens, abre, fecha;

  if (Array.isArray(v)) {
    if (!v.length) return '[]';
    itens = []; let buracos = 0;
    const fecharBuracos = () => {
      if (buracos) itens.push(`<${buracos} empty item${buracos > 1 ? 's' : ''}>`);
      buracos = 0;
    };
    for (let i = 0; i < v.length; i++) {
      if (!(i in v)) { buracos++; continue; }   // delete em array deixa buraco, não remove
      fecharBuracos(); itens.push(filho(v[i]));
    }
    fecharBuracos();
    [abre, fecha] = ['[', ']'];
  } else if (v instanceof Map) {
    if (!v.size) return 'Map(0) {}';
    itens = [...v].map(([k, x]) => `${filho(k)} => ${filho(x)}`); [abre, fecha] = [`Map(${v.size}) {`, '}'];
  } else if (v instanceof Set) {
    if (!v.size) return 'Set(0) {}';
    itens = [...v].map(filho); [abre, fecha] = [`Set(${v.size}) {`, '}'];
  } else {
    const chaves = Object.keys(v);
    if (!chaves.length) return '{}';
    itens = chaves.map((k) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : `'${k}'`}: ${filho(v[k])}`);
    const classe = v.constructor?.name;
    [abre, fecha] = [classe && classe !== 'Object' ? classe + ' {' : '{', '}'];
  }

  const curto = `${abre} ${itens.join(', ')} ${fecha}`;
  // Mesma conta do util.inspect do node para decidir se cabe numa linha só: soma os itens,
  // o recuo do nível, as vírgulas e uma folga fixa, contra uma largura de 80 colunas.
  const largura = 2 * itens.length + prof * 2 + abre.length + 10
    + itens.reduce((soma, i) => soma + i.length, 0);
  if (largura <= 80 && !curto.includes('\n')) return curto;
  // O filho é montado com recuo relativo (um nível) e o pai empurra o dele por cima —
  // se o filho já viesse com o recuo absoluto, os dois se somariam e o aninhado sairia torto.
  const recuo = '  ';
  return `${abre}\n${itens.map((i) => recuo + i.replace(/\n/g, '\n' + recuo)).join(',\n')}\n${fecha}`;
}

/** Colore a saída já pronta: textos, números e literais. */
function colorirSaida(txt) {
  const REGRA = /('(?:\\.|[^'\\])*')|\b(-?\d+(?:\.\d+)?)\b|\b(true|false)\b|\b(null|undefined|NaN)\b|\b([A-Za-z_$][\w$]*(?=:))/g;
  let saida = '', fim = 0, m;
  while ((m = REGRA.exec(txt))) {
    saida += esc(txt.slice(fim, m.index)); fim = m.index + m[0].length;
    const cls = m[1] ? 's' : m[2] ? 'n' : m[3] ? 'b' : m[4] ? 'nl' : 'k';
    saida += `<span class="${cls}">${esc(m[0])}</span>`;
  }
  return saida + esc(txt.slice(fim));
}

/** Tabela ASCII no estilo do console.table do node. */
function montarTabela(dados) {
  const linhas = Array.isArray(dados) ? dados.map((v, i) => [String(i), v]) : Object.entries(dados);
  const colunas = [];
  for (const [, v] of linhas)
    if (v && typeof v === 'object') for (const k of Object.keys(v)) if (!colunas.includes(k)) colunas.push(k);
  const temValor = linhas.some(([, v]) => !v || typeof v !== 'object');
  const cabecas = ['(index)', ...colunas, ...(temValor ? ['Values'] : [])];

  const celulas = linhas.map(([i, v]) => [
    i,
    ...colunas.map((k) => (v && typeof v === 'object' && k in v ? inspecionar(v[k], 1) : '')),
    ...(temValor ? [v && typeof v === 'object' ? '' : inspecionar(v, 1)] : []),
  ]);

  const largura = cabecas.map((c, i) => Math.max(c.length, ...celulas.map((l) => l[i].length)) + 2);
  const barra = (e, m, d) => e + largura.map((w) => '─'.repeat(w)).join(m) + d;
  const linha = (cs) => '│' + cs.map((c, i) => ' ' + c.padEnd(largura[i] - 1)).join('│') + '│';
  return [barra('┌', '┬', '┐'), linha(cabecas), barra('├', '┼', '┤'), ...celulas.map(linha), barra('└', '┴', '┘')].join('\n');
}

/* ═══ Módulos internos do Node, dentro do navegador ══════════════ */
/* O site roda os exemplos no navegador, onde não existe `require` nem disco. Estes
   três módulos são imitações fiéis o bastante para os exemplos do curso: `path` é
   cálculo de texto (funciona igual), `os` devolve valores fixos e `fs` grava num
   disco de mentira que vive na memória e some ao recarregar a página. Módulo que
   depende do sistema de verdade (http, child_process) avisa para rodar no terminal. */

function moduloPath() {
  const normalizar = (p) => {
    const absoluto = p.startsWith('/');
    const partes = [];
    for (const pedaco of p.split('/')) {
      if (!pedaco || pedaco === '.') continue;
      if (pedaco === '..' && partes.length && partes[partes.length - 1] !== '..') partes.pop();
      else if (pedaco === '..' && absoluto) continue;
      else partes.push(pedaco);
    }
    return (absoluto ? '/' : '') + partes.join('/') || (absoluto ? '/' : '.');
  };
  const path = {
    sep: '/',
    join: (...p) => normalizar(p.filter(Boolean).join('/')),
    resolve: (...p) => {
      let fim = '';
      for (const pedaco of p) {
        if (!pedaco) continue;
        fim = pedaco.startsWith('/') ? pedaco : fim ? fim + '/' + pedaco : pedaco;
      }
      return normalizar(fim.startsWith('/') ? fim : '/Users/igor/Cursos/' + fim);
    },
    normalize: normalizar,
    isAbsolute: (p) => p.startsWith('/'),
    dirname: (p) => { const i = p.replace(/\/+$/, '').lastIndexOf('/'); return i > 0 ? p.slice(0, i) : i === 0 ? '/' : '.'; },
    basename: (p, ext) => { const b = p.replace(/\/+$/, '').split('/').pop() || ''; return ext && b.endsWith(ext) ? b.slice(0, -ext.length) : b; },
    extname: (p) => { const b = p.split('/').pop() || ''; const i = b.lastIndexOf('.'); return i > 0 ? b.slice(i) : ''; },
    relative: (de, para) => {
      const a = normalizar(de).split('/'), b = normalizar(para).split('/');
      while (a.length && b.length && a[0] === b[0]) { a.shift(); b.shift(); }
      return [...a.map(() => '..'), ...b].join('/');
    },
  };
  path.posix = path;
  return path;
}

function moduloFs(path) {
  const arquivos = new Map();          // caminho → conteúdo
  const pastas = new Set(['/', '/tmp']);
  const vigias = new Map();            // caminho → funções avisadas quando o arquivo muda
  let contador = 0;

  const erro = (codigo, mensagem) => Object.assign(new Error(mensagem), { code: codigo });
  const semArquivo = (p, chamada) => erro('ENOENT', `ENOENT: no such file or directory, ${chamada} '${p}'`);
  const garantirPasta = (p, chamada) => { if (!pastas.has(path.dirname(p))) throw semArquivo(p, chamada); };

  const fs = {
    mkdirSync(p, opcoes = {}) {
      p = path.resolve(p);
      if (!opcoes.recursive) garantirPasta(p, 'mkdir');
      const partes = p.split('/').filter(Boolean);
      let atual = '';
      for (const parte of partes) { atual += '/' + parte; pastas.add(atual); }
      return opcoes.recursive ? p : undefined;
    },
    mkdtempSync(prefixo) {
      const p = path.resolve(prefixo + String(++contador).padStart(6, '0'));
      fs.mkdirSync(p, { recursive: true });
      return p;
    },
    writeFileSync(p, dados) {
      p = path.resolve(p);
      garantirPasta(p, 'open');
      const novo = String(dados);
      const mudou = arquivos.get(p) !== novo;
      arquivos.set(p, novo);
      if (mudou) (vigias.get(p) || []).forEach((fn) => fn('change', path.basename(p)));
    },
    watch(p, aoMudar) {
      p = path.resolve(p);
      const lista = vigias.get(p) || [];
      lista.push(aoMudar);
      vigias.set(p, lista);
      return { close: () => vigias.set(p, (vigias.get(p) || []).filter((f) => f !== aoMudar)) };
    },
    appendFileSync(p, dados) {
      p = path.resolve(p);
      garantirPasta(p, 'open');
      arquivos.set(p, (arquivos.get(p) ?? '') + String(dados));
    },
    readFileSync(p, codificacao) {
      p = path.resolve(p);
      if (!arquivos.has(p)) throw semArquivo(p, 'open');
      const texto = arquivos.get(p);
      return codificacao ? texto : { toString: (c) => texto, texto, tipo: 'Buffer' };
    },
    existsSync: (p) => arquivos.has(path.resolve(p)) || pastas.has(path.resolve(p)),
    readdirSync(p) {
      p = path.resolve(p);
      if (!pastas.has(p)) throw semArquivo(p, 'scandir');
      const dentro = new Set();
      const prefixo = p === '/' ? '/' : p + '/';
      for (const caminho of [...arquivos.keys(), ...pastas])
        if (caminho.startsWith(prefixo) && caminho !== p) dentro.add(caminho.slice(prefixo.length).split('/')[0]);
      return [...dentro].sort();
    },
    unlinkSync: (p) => { arquivos.delete(path.resolve(p)); },
    rmSync(p, opcoes = {}) {
      p = path.resolve(p);
      arquivos.delete(p);
      if (opcoes.recursive) {
        for (const c of [...arquivos.keys()]) if (c.startsWith(p + '/')) arquivos.delete(c);
        for (const c of [...pastas]) if (c.startsWith(p + '/') || c === p) pastas.delete(c);
      }
    },
    statSync(p) {
      p = path.resolve(p);
      if (arquivos.has(p)) return { isFile: () => true, isDirectory: () => false, size: arquivos.get(p).length };
      if (pastas.has(p)) return { isFile: () => false, isDirectory: () => true, size: 0 };
      throw semArquivo(p, 'stat');
    },
  };

  const promessas = {
    writeFile: async (...a) => fs.writeFileSync(...a),
    appendFile: async (...a) => fs.appendFileSync(...a),
    readFile: async (...a) => fs.readFileSync(...a),
    mkdir: async (...a) => fs.mkdirSync(...a),
    readdir: async (...a) => fs.readdirSync(...a),
    rm: async (...a) => fs.rmSync(...a),
    unlink: async (...a) => fs.unlinkSync(...a),
    stat: async (...a) => fs.statSync(...a),
  };

  fs.promises = promessas;
  return { fs, promessas, arquivos };
}

/** `http` de mentira: o servidor vive na memória e o `fetch` da caixa fala com ele. */
function moduloHttp(agendar) {
  const servidores = new Map();          // porta → função que atende
  let proximaPorta = 3001;
  const TEXTO = { 200: 'OK', 201: 'Created', 302: 'Found', 400: 'Bad Request', 404: 'Not Found', 500: 'Internal Server Error' };

  const http = {
    createServer(atender) {
      const servidor = {
        listen(porta, aoSubir) {
          if (typeof porta === 'function') { aoSubir = porta; porta = 0; }
          servidor.porta = porta || proximaPorta++;   // porta 0 = o sistema escolhe uma livre
          servidores.set(servidor.porta, atender);
          agendar(() => aoSubir && aoSubir(), 0);
          return servidor;
        },
        address: () => ({ address: '::', port: servidor.porta }),
        close: (aoFechar) => { servidores.delete(servidor.porta); aoFechar && agendar(aoFechar, 0); return servidor; },
        closeAllConnections: () => servidor,
        closeIdleConnections: () => servidor,
        on: () => servidor,
      };
      return servidor;
    },
  };

  /** Faz o papel do fetch: entrega o pedido ao servidor registrado naquela porta. */
  const buscar = (endereco, opcoes = {}) => new Promise((resolver, rejeitar) => {
    const url = new URL(String(endereco));
    const atender = servidores.get(Number(url.port));
    if (!atender) return rejeitar(Object.assign(new TypeError('fetch failed'), { code: 'ECONNREFUSED' }));

    const cabecalhosPedido = {};
    for (const [k, v] of Object.entries(opcoes.headers || {})) cabecalhosPedido[k.toLowerCase()] = v;
    if (opcoes.signal) {                       // fetch cancelado por AbortController
      opcoes.signal.addEventListener('abort', () =>
        rejeitar(Object.assign(new Error('This operation was aborted'), { name: 'AbortError' })));
    }
    const req = {
      method: (opcoes.method || 'GET').toUpperCase(),
      url: url.pathname + url.search,
      headers: cabecalhosPedido,
      corpoBruto: '',                            // o parser do Express lê daqui
      on: () => req,
    };
    if (opcoes.body && typeof opcoes.body._serializar === 'function') {
      const { corpo, tipo } = opcoes.body._serializar();   // FormData vira multipart
      req.corpoBruto = corpo;
      if (!cabecalhosPedido['content-type']) cabecalhosPedido['content-type'] = tipo;
    } else if (opcoes.body) {
      req.corpoBruto = String(opcoes.body);
    }
    let corpo = '';
    const cabecalhos = {};
    const res = {
      statusCode: 200,
      setHeader: (nome, valor) => { cabecalhos[String(nome).toLowerCase()] = valor; return res; },
      getHeader: (nome) => cabecalhos[String(nome).toLowerCase()],
      writeHead(codigo) { res.statusCode = codigo; return res; },
      write(pedaco) { corpo += String(pedaco ?? ''); return true; },
      headersSent: false,
      end(pedaco) {
        if (res.headersSent) {                       // igual ao Node: só uma resposta por pedido
          throw Object.assign(new Error('Cannot set headers after they are sent to the client'),
            { code: 'ERR_HTTP_HEADERS_SENT' });
        }
        res.headersSent = true;
        corpo += String(pedaco ?? '');
        resolver({
          status: res.statusCode,
          statusText: TEXTO[res.statusCode] ?? '',
          ok: res.statusCode < 400,
          headers: { get: (nome) => cabecalhos[String(nome).toLowerCase()] ?? null },
          text: async () => corpo,
          json: async () => JSON.parse(corpo),
        });
        return res;
      },
    };
    atender(req, res);
  });

  return { http, buscar };
}

/* ═══ Bibliotecas de banco e de autenticação, dentro do navegador ══════════════ */
/* O curso de Node usa bcryptjs, jsonwebtoken e Sequelize nos exemplos das sessões 5 e 6.
   Nenhum dos três roda no navegador como está: dois dependem de criptografia do Node e o
   terceiro fala com um banco de verdade. Estas imitações reproduzem o COMPORTAMENTO que os
   exemplos ensinam — formato do hash, assinatura que confere, validação, tabela em memória
   — para que o aprendiz veja a mesma saída aqui e no terminal. */

/** bcryptjs: hash com sal sorteado e comparação, no mesmo formato de 60 caracteres. */
function moduloBcrypt() {
  const ALFABETO = './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const sortear = (n) => Array.from({ length: n },
    () => ALFABETO[Math.floor(Math.random() * ALFABETO.length)]).join('');

  // Resumo determinístico: o bcrypt de verdade é outra conta, mas a propriedade que os
  // exemplos usam é a mesma — mesma senha + mesmo sal dão sempre o mesmo resultado.
  const resumir = (texto, tamanho) => {
    let saida = '';
    for (let i = 0; saida.length < tamanho; i++) {
      let h = 0x811c9dc5 ^ i;
      for (const c of texto) h = Math.imul(h ^ c.charCodeAt(0), 0x01000193) >>> 0;
      saida += ALFABETO[h % ALFABETO.length] + ALFABETO[(h >>> 8) % ALFABETO.length]
             + ALFABETO[(h >>> 16) % ALFABETO.length] + ALFABETO[(h >>> 24) % ALFABETO.length];
    }
    return saida.slice(0, tamanho);
  };

  const montar = (senha, custo, sal) =>
    `$2b$${String(custo).padStart(2, '0')}$${sal}${resumir(sal + ':' + senha, 31)}`;

  const hashSync = (senha, custo = 10) => montar(String(senha), custo, sortear(22));
  const compareSync = (senha, hash) => {
    if (typeof hash !== 'string') return false;
    const m = /^\$2[aby]\$(\d{2})\$(.{22})/.exec(hash);
    if (!m) return false;
    return montar(String(senha), Number(m[1]), m[2]) === hash;
  };

  return {
    hash: async (senha, custo) => hashSync(senha, custo),
    compare: async (senha, hash) => compareSync(senha, hash),
    hashSync, compareSync,
    genSaltSync: (custo = 10) => `$2b$${String(custo).padStart(2, '0')}$${sortear(22)}`,
  };
}

/** jsonwebtoken: as três partes, a validade e os erros com os nomes de verdade. */
function moduloJwt() {
  const b64url = (texto) => btoa(unescape(encodeURIComponent(texto)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  const assinar = (conteudo, segredo) => {
    let saida = '';
    for (let i = 0; saida.length < 43; i++) {
      let h = 0x811c9dc5 ^ i;
      for (const c of conteudo + '|' + segredo) h = Math.imul(h ^ c.charCodeAt(0), 0x01000193) >>> 0;
      saida += b64url(String(h)).slice(0, 6);
    }
    return saida.slice(0, 43);
  };

  const SEGUNDOS = { s: 1, m: 60, h: 3600, d: 86400 };
  const emSegundos = (v) => {
    if (typeof v === 'number') return v;
    const m = /^(-?\d+)([smhd])$/.exec(String(v));
    return m ? Number(m[1]) * SEGUNDOS[m[2]] : 0;
  };

  const erro = (nome, mensagem) => Object.assign(new Error(mensagem), { name: nome });

  return {
    sign(dados, segredo, opcoes = {}) {
      const agora = Math.floor(Date.now() / 1000);
      const corpo = { ...dados, iat: agora };
      if (opcoes.expiresIn !== undefined) corpo.exp = agora + emSegundos(opcoes.expiresIn);
      const cabecalho = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const meio = b64url(JSON.stringify(corpo));
      return `${cabecalho}.${meio}.${assinar(cabecalho + '.' + meio, segredo)}`;
    },
    verify(token, segredo) {
      const partes = String(token).split('.');
      if (partes.length !== 3) throw erro('JsonWebTokenError', 'jwt malformed');
      const [cabecalho, meio, assinatura] = partes;
      let corpo;
      try { corpo = JSON.parse(decodeURIComponent(escape(atob(meio.replace(/-/g, '+').replace(/_/g, '/'))))); }
      catch { throw erro('JsonWebTokenError', 'invalid token'); }
      if (assinar(cabecalho + '.' + meio, segredo) !== assinatura)
        throw erro('JsonWebTokenError', 'invalid signature');
      if (corpo.exp !== undefined && corpo.exp < Math.floor(Date.now() / 1000))
        throw erro('TokenExpiredError', 'jwt expired');
      return corpo;
    },
    decode(token) {
      const meio = String(token).split('.')[1];
      try { return JSON.parse(decodeURIComponent(escape(atob(meio.replace(/-/g, '+').replace(/_/g, '/'))))); }
      catch { return null; }
    },
  };
}

/** Sequelize: tabela em memória, com validação, hooks, associação e queryInterface. */
function moduloSequelize(path) {
  const erroDe = (nome, mensagem, extras = {}) =>
    Object.assign(new Error(mensagem), { name: nome, ...extras });

  // ── Tipos ──
  const tipo = (chave, sql) => Object.assign(
    (...args) => ({ key: chave, sql: args.length ? `${chave}(${args.join(',')})` : sql }),
    { key: chave, sql },
  );
  const DataTypes = {
    STRING: tipo('STRING', 'VARCHAR(255)'),
    TEXT: tipo('TEXT', 'TEXT'),
    INTEGER: tipo('INTEGER', 'INTEGER'),
    BIGINT: tipo('BIGINT', 'BIGINT'),
    FLOAT: tipo('FLOAT', 'FLOAT'),
    DECIMAL: tipo('DECIMAL', 'DECIMAL'),
    BOOLEAN: tipo('BOOLEAN', 'TINYINT(1)'),
    DATE: tipo('DATE', 'DATETIME'),
    DATEONLY: tipo('DATEONLY', 'DATE'),
    VIRTUAL: tipo('VIRTUAL', 'VIRTUAL'),
    UUID: tipo('UUID', 'UUID'),
  };
  const sqlDo = (t) => (t && (t.sql || (t.key && DataTypes[t.key] && DataTypes[t.key].sql))) || 'VARCHAR(255)';

  // ── Operadores ──
  const Op = {};
  for (const nome of ['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'like', 'notLike', 'in', 'notIn', 'between', 'or', 'and'])
    Op[nome] = Symbol('Op.' + nome);

  const combina = (valor, regra) => {
    if (regra === null || typeof regra !== 'object' || Array.isArray(regra)) return valor === regra;
    for (const chave of Object.getOwnPropertySymbols(regra)) {
      const alvo = regra[chave];
      const texto = String(valor);
      if (chave === Op.eq && !(valor === alvo)) return false;
      if (chave === Op.ne && !(valor !== alvo)) return false;
      if (chave === Op.gt && !(valor > alvo)) return false;
      if (chave === Op.gte && !(valor >= alvo)) return false;
      if (chave === Op.lt && !(valor < alvo)) return false;
      if (chave === Op.lte && !(valor <= alvo)) return false;
      if (chave === Op.in && !alvo.includes(valor)) return false;
      if (chave === Op.notIn && alvo.includes(valor)) return false;
      if (chave === Op.between && !(valor >= alvo[0] && valor <= alvo[1])) return false;
      if (chave === Op.like || chave === Op.notLike) {
        const re = new RegExp('^' + String(alvo).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          .replace(/%/g, '.*').replace(/_/g, '.') + '$');
        if (re.test(texto) !== (chave === Op.like)) return false;
      }
    }
    return true;
  };
  const filtra = (linha, where = {}) =>
    Object.entries(where).every(([campo, regra]) => combina(linha[campo], regra));

  // ── Uma conexão ──
  class Sequelize {
    constructor(a, b, c, d) {
      const opcoes = typeof a === 'object' && a !== null ? a : (d || {});
      this.options = { dialect: 'sqlite', storage: ':memory:', ...opcoes };
      this.tabelas = new Map();       // nome → { colunas, linhas, proximoId }
      this.models = new Map();
      this._contar = typeof this.options.logging === 'function' ? this.options.logging : null;
    }

    _log(sql) { if (this._contar) this._contar(sql); }

    _tabela(nome) {
      if (!this.tabelas.has(nome)) this.tabelas.set(nome, { colunas: new Map(), linhas: [], proximoId: 1 });
      return this.tabelas.get(nome);
    }

    getDialect() { return this.options.dialect; }

    async authenticate() {
      const { storage, dialect } = this.options;
      if (dialect === 'sqlite' && storage && storage !== ':memory:') {
        const pasta = path.dirname(storage);
        throw erroDe('Error', `ENOENT: no such file or directory, mkdir '${pasta}'`, { code: 'ENOENT' });
      }
      return this;
    }

    async close() { return undefined; }

    define(nome, atributos, opcoes = {}) {
      const model = criarModel(this, nome, atributos, opcoes);
      this.models.set(nome, model);
      return model;
    }

    async sync(opcoes = {}) {
      for (const model of this.models.values()) {
        const tabela = this._tabela(model.getTableName());
        if (opcoes.force) { tabela.linhas = []; tabela.proximoId = 1; }
        tabela.colunas = new Map(model._colunas.map((c) => [c.nome, c]));
        this._log('CREATE TABLE ' + model.getTableName());
      }
      return this;
    }

    getQueryInterface() { return criarQueryInterface(this); }

    async query(sql, opcoes = {}) {
      const m = /^\s*select\s+(.+?)\s+from\s+["'`]?(\w+)["'`]?/i.exec(String(sql));
      if (!m) return [[], {}];
      const tabela = this._tabela(m[2]);
      const colunas = m[1].trim() === '*' ? [...tabela.colunas.keys()] : m[1].split(',').map((c) => c.trim());
      this._log(sql);
      const linhas = tabela.linhas.map((l) => Object.fromEntries(colunas.map((c) => [c, l[c] ?? null])));
      return opcoes.type === 'SELECT' || opcoes.type === 'select' ? linhas : [linhas, {}];
    }
  }

  // ── Validação ──
  const validar = (model, valores, apenas) => {
    const erros = [];
    for (const coluna of model._todasColunas) {
      if (apenas && !(coluna.nome in valores)) continue;
      const valor = valores[coluna.nome];
      const nulo = valor === undefined || valor === null || valor === '';
      if (coluna.allowNull === false && nulo && !coluna.autoIncrement && !coluna.primaryKey)
        erros.push({ path: coluna.nome, message: `${model.name}.${coluna.nome} cannot be null` });
      const regras = coluna.validate || {};
      if (nulo) continue;
      for (const [regra, cfg] of Object.entries(regras)) {
        const msg = cfg && cfg.msg;
        const args = cfg && cfg.args !== undefined ? cfg.args : cfg;
        let falhou = false;
        if (regra === 'len') falhou = String(valor).length < args[0] || String(valor).length > args[1];
        else if (regra === 'isEmail') falhou = !/^[^@\s]+@[^@\s]+\.?[^@\s]*$/.test(String(valor));
        else if (regra === 'isInt') falhou = !Number.isInteger(Number(valor));
        else if (regra === 'min') falhou = Number(valor) < args;
        else if (regra === 'max') falhou = Number(valor) > args;
        else if (regra === 'notEmpty') falhou = String(valor).trim() === '';
        if (falhou) erros.push({ path: coluna.nome, message: msg || `Validation ${regra} on ${coluna.nome} failed` });
      }
    }
    if (erros.length) throw erroDe(
      'SequelizeValidationError',
      `${model.name} validation failed: ` + erros.map((e) => `${e.path}: ${e.message}`).join(',\n'),
      { errors: erros },
    );
  };

  // ── Um model ──
  function criarModel(conexao, nome, atributos, opcoes) {
    const pluralizar = (n) => n.replace(/y$/, 'ie') + 's';
    const paraColuna = (n) => (opcoes.underscored ? n.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase() : n);
    const comTimestamp = opcoes.timestamps !== false;

    const colunas = [{ nome: 'id', field: 'id', tipo: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true }];
    for (const [campo, bruto] of Object.entries(atributos)) {
      const def = (bruto && (bruto.type || bruto.key)) ? (bruto.type ? bruto : { type: bruto }) : { type: bruto };
      colunas.push({
        nome: campo, field: def.field || paraColuna(campo), tipo: def.type,
        allowNull: def.allowNull, unique: def.unique, defaultValue: def.defaultValue,
        validate: def.validate, virtual: (def.type && def.type.key) === 'VIRTUAL',
      });
    }
    if (comTimestamp)
      for (const campo of ['createdAt', 'updatedAt'])
        colunas.push({ nome: campo, field: paraColuna(campo), tipo: DataTypes.DATE, allowNull: false });

    const tabela = opcoes.tableName || pluralizar(nome);
    const hooks = { beforeSave: [] };
    const associacoes = new Map();

    class Instancia {
      constructor(valores) { Object.assign(this, valores); }

      async update(mudancas) {
        Object.assign(this, mudancas);
        validar(Model, this, true);
        for (const fn of hooks.beforeSave) await fn(this);
        const linha = Model._linhas().find((l) => l.id === this.id);
        if (linha) for (const c of Model._colunas) if (!c.virtual) linha[c.nome] = this[c.nome];
        conexao._log('UPDATE ' + tabela);
        return this;
      }

      async destroy() {
        const alvo = conexao._tabela(tabela);
        alvo.linhas = alvo.linhas.filter((l) => l.id !== this.id);
        conexao._log('DELETE FROM ' + tabela);
        return this;
      }

      async validate() { validar(Model, this); }
      get(campo) { return campo ? this[campo] : { ...this }; }
      toJSON() { return { ...this }; }
      toObject() { return { ...this }; }
    }

    const Model = Instancia;
    Model._colunas = colunas.filter((c) => !c.virtual);
    Model._todasColunas = colunas;
    Model._linhas = () => conexao._tabela(tabela).linhas;
    Object.defineProperty(Model, 'name', { value: nome });
    Model.getTableName = () => tabela;
    Model.getAttributes = () => Object.fromEntries(colunas.map((c) => [c.nome, {
      type: c.tipo, field: c.field, allowNull: c.allowNull !== false,
      primaryKey: Boolean(c.primaryKey), autoIncrement: Boolean(c.autoIncrement),
    }]));
    Model.rawAttributes = Model.getAttributes();
    Model.beforeSave = (fn) => hooks.beforeSave.push(fn);
    Model.addHook = (evento, fn) => { (hooks[evento] = hooks[evento] || []).push(fn); };
    Model.sync = (o) => conexao.sync(o);

    const montarInstancia = (linha, opcoesBusca = {}) => {
      const inst = new Instancia(linha);
      for (const [apelido, assoc] of associacoes) {
        const metodo = 'get' + apelido[0].toUpperCase() + apelido.slice(1);
        inst[metodo] = async () => {
          conexao._log('SELECT ' + assoc.alvo.getTableName());
          return assoc.tipo === 'hasMany'
            ? assoc.alvo._linhas().filter((l) => l[assoc.chave] === inst.id).map((l) => new assoc.alvo(l))
            : (assoc.alvo._linhas().find((l) => l.id === inst[assoc.chave]) || null);
        };
      }
      const inclui = opcoesBusca.include
        ? (Array.isArray(opcoesBusca.include) ? opcoesBusca.include : [opcoesBusca.include]) : [];
      for (const item of inclui) {
        const apelido = typeof item === 'string' ? item : item.association;
        const assoc = associacoes.get(apelido);
        if (!assoc) continue;
        inst[apelido] = assoc.tipo === 'hasMany'
          ? assoc.alvo._linhas().filter((l) => l[assoc.chave] === inst.id).map((l) => new assoc.alvo(l))
          : (assoc.alvo._linhas().find((l) => l.id === inst[assoc.chave]) || null);
      }
      return inst;
    };

    const preparar = async (dados) => {
      const inst = new Instancia({});
      for (const c of Model._todasColunas) {
        if (c.nome === 'id') continue;
        if (dados[c.nome] !== undefined) inst[c.nome] = dados[c.nome];
        else if (c.defaultValue !== undefined)
          inst[c.nome] = typeof c.defaultValue === 'function' ? c.defaultValue() : c.defaultValue;
      }
      validar(Model, inst);
      for (const fn of hooks.beforeSave) await fn(inst);
      return inst;
    };

    const gravar = (inst) => {
      const alvo = conexao._tabela(tabela);
      const linha = { id: alvo.proximoId++ };
      for (const c of Model._colunas) if (c.nome !== 'id') linha[c.nome] = inst[c.nome] ?? null;
      alvo.linhas.push(linha);
      inst.id = linha.id;
      return inst;
    };

    Model.create = async (dados = {}) => {
      const inst = await preparar(dados);
      conexao._log('INSERT INTO ' + tabela);
      return gravar(inst);
    };

    Model.bulkCreate = async (lista) => {
      const prontos = [];
      for (const dados of lista) prontos.push(gravar(await preparar(dados)));
      conexao._log('INSERT INTO ' + tabela);
      return prontos;
    };

    Model.findAll = async (o = {}) => {
      conexao._log('SELECT FROM ' + tabela);
      let linhas = Model._linhas().filter((l) => filtra(l, o.where));
      for (const [campo, direcao] of (o.order || []).slice().reverse())
        linhas = linhas.slice().sort((a, b) => (a[campo] > b[campo] ? 1 : a[campo] < b[campo] ? -1 : 0)
          * (String(direcao).toUpperCase() === 'DESC' ? -1 : 1));
      if (o.offset) linhas = linhas.slice(o.offset);
      if (o.limit !== undefined) linhas = linhas.slice(0, o.limit);
      return linhas.map((l) => montarInstancia(
        o.attributes ? Object.fromEntries(o.attributes.map((c) => [c, l[c]])) : l, o));
    };

    Model.findByPk = async (id, o = {}) => {
      conexao._log('SELECT FROM ' + tabela);
      const linha = Model._linhas().find((l) => l.id === Number(id));
      return linha ? montarInstancia(linha, o) : null;
    };

    Model.findOne = async (o = {}) => {
      conexao._log('SELECT FROM ' + tabela);
      const linha = Model._linhas().find((l) => filtra(l, o.where));
      return linha ? montarInstancia(linha, o) : null;
    };

    Model.count = async (o = {}) => {
      conexao._log('SELECT COUNT FROM ' + tabela);
      return Model._linhas().filter((l) => filtra(l, o.where)).length;
    };

    Model.findAndCountAll = async (o = {}) => ({
      count: Model._linhas().filter((l) => filtra(l, o.where)).length,
      rows: await Model.findAll(o),
    });

    Model.update = async (valores, o = {}) => {
      const alvos = Model._linhas().filter((l) => filtra(l, o.where));
      for (const linha of alvos) Object.assign(linha, valores);
      conexao._log('UPDATE ' + tabela);
      return [alvos.length];
    };

    Model.destroy = async (o = {}) => {
      const alvo = conexao._tabela(tabela);
      const antes = alvo.linhas.length;
      alvo.linhas = alvo.linhas.filter((l) => !filtra(l, o.where));
      conexao._log('DELETE FROM ' + tabela);
      return antes - alvo.linhas.length;
    };

    Model.belongsTo = (alvo, o = {}) => {
      associacoes.set(o.as || alvo.name.toLowerCase(), { tipo: 'belongsTo', alvo, chave: o.foreignKey });
    };
    Model.hasMany = (alvo, o = {}) => {
      associacoes.set(o.as || pluralizar(alvo.name).toLowerCase(), { tipo: 'hasMany', alvo, chave: o.foreignKey });
    };
    Model.hasOne = (alvo, o = {}) => {
      associacoes.set(o.as || alvo.name.toLowerCase(), { tipo: 'hasOne', alvo, chave: o.foreignKey });
    };
    Model.associate = () => {};

    return Model;
  }

  // ── queryInterface: o que as migrations usam ──
  function criarQueryInterface(conexao) {
    const descrever = (def) => ({
      type: sqlDo(def && (def.type || def)),
      allowNull: !(def && def.allowNull === false) && !(def && def.primaryKey),
      primaryKey: Boolean(def && def.primaryKey),
      defaultValue: (def && def.defaultValue) ?? null,
    });

    return {
      async createTable(nome, definicoes) {
        const tabela = conexao._tabela(nome);
        tabela.colunas = new Map(Object.entries(definicoes).map(([c, def]) => [c, def]));
        conexao._log('CREATE TABLE ' + nome);
      },
      async dropTable(nome) { conexao.tabelas.delete(nome); conexao._log('DROP TABLE ' + nome); },
      async addColumn(tabelaNome, coluna, def) { conexao._tabela(tabelaNome).colunas.set(coluna, def); },
      async removeColumn(tabelaNome, coluna) { conexao._tabela(tabelaNome).colunas.delete(coluna); },
      async describeTable(nome) {
        const tabela = conexao.tabelas.get(nome);
        if (!tabela) throw erroDe('Error', `No description found for "${nome}" table.`);
        return Object.fromEntries([...tabela.colunas].map(([c, def]) => [c, descrever(def)]));
      },
      async showAllTables() { return [...conexao.tabelas.keys()]; },
      async bulkInsert(nome, linhas) {
        const tabela = conexao._tabela(nome);
        for (const linha of linhas) tabela.linhas.push({ id: tabela.proximoId++, ...linha });
      },
      async bulkDelete(nome) { conexao._tabela(nome).linhas = []; },
    };
  }

  Sequelize.DataTypes = DataTypes;
  Sequelize.Op = Op;
  return { Sequelize, DataTypes, Op, default: Sequelize };
}

/* ═══ Envio de arquivo: FormData, Blob, Buffer e o Multer ══════════════ */
/* O navegador tem FormData e Blob de verdade, mas o `fetch` daqui é de mentira: ele entrega
   o pedido a um servidor que vive na memória. Estas imitações fazem o caminho inteiro —
   montar o multipart, mandar, o Multer separar os pedaços e gravar no disco de mentira. */

function moduloMultipart(fs, path) {
  const CRLF = String.fromCharCode(13, 10);

  const conteudoDe = (parte) => {
    if (parte == null) return '';
    if (typeof parte === 'string') return parte;
    if (parte._texto !== undefined) return parte._texto;
    if (typeof parte.length === 'number') return ' '.repeat(parte.length);
    return String(parte);
  };

  class Blob {
    constructor(partes = [], opcoes = {}) {
      this._texto = partes.map(conteudoDe).join('');
      this.size = this._texto.length;
      this.type = opcoes.type || '';
    }
    async text() { return this._texto; }
  }

  class FormData {
    constructor() { this._campos = []; }
    append(nome, valor, nomeArquivo) {
      this._campos.push({ nome, valor, nomeArquivo: nomeArquivo ?? (valor instanceof Blob ? 'blob' : undefined) });
    }
    get(nome) { const c = this._campos.find((x) => x.nome === nome); return c ? c.valor : null; }
    getAll(nome) { return this._campos.filter((x) => x.nome === nome).map((x) => x.valor); }
    has(nome) { return this._campos.some((x) => x.nome === nome); }
    delete(nome) { this._campos = this._campos.filter((x) => x.nome !== nome); }
    entries() { return this._campos.map((c) => [c.nome, c.valor])[Symbol.iterator](); }
    _serializar() { return serializar(this); }
    [Symbol.iterator]() { return this.entries(); }
  }

  const decodificar64 = (texto, url) => {
    const b64 = url ? String(texto).replace(/-/g, '+').replace(/_/g, '/') : String(texto);
    const completo = b64 + '==='.slice((b64.length + 3) % 4);
    return decodeURIComponent(escape(atob(completo)));
  };

  const embrulhar = (texto) => ({
    _texto: texto,
    length: texto.length,
    byteLength: texto.length,
    toString: (cod) => (cod === 'base64' ? btoa(unescape(encodeURIComponent(texto))) : texto),
  });

  const Buffer = {
    from: (dado, cod) => embrulhar(
      cod === 'base64url' ? decodificar64(dado, true)
        : cod === 'base64' ? decodificar64(dado, false)
          : String(dado),
    ),
    alloc: (tamanho, preencher = ' ') => embrulhar(String(preencher).repeat(tamanho)),
    isBuffer: (v) => Boolean(v && v._texto !== undefined),
    byteLength: (v) => conteudoDe(v).length,
  };

  const LIMITE = '----SandboxFormBoundary7MA4YWxkTrZu0gW';

  /** FormData vira o corpo `multipart/form-data` que o Multer sabe ler. */
  const serializar = (formulario) => {
    let corpo = '';
    for (const campo of formulario._campos) {
      corpo += `--${LIMITE}${CRLF}Content-Disposition: form-data; name="${campo.nome}"`;
      if (campo.nomeArquivo !== undefined) {
        corpo += `; filename="${campo.nomeArquivo}"${CRLF}`;
        corpo += `Content-Type: ${(campo.valor && campo.valor.type) || 'application/octet-stream'}${CRLF}`;
      } else {
        corpo += CRLF;
      }
      corpo += `${CRLF}${conteudoDe(campo.valor)}${CRLF}`;
    }
    return { corpo: `${corpo}--${LIMITE}--${CRLF}`, tipo: `multipart/form-data; boundary=${LIMITE}` };
  };

  const analisar = (bruto, contentType) => {
    const limite = /boundary=([^;]+)/.exec(String(contentType || ''))?.[1];
    if (!limite || !bruto) return [];
    return String(bruto).split(`--${limite}`).slice(1, -1).map((pedaco) => {
      const [cabecalhos, ...resto] = pedaco.replace(new RegExp('^' + CRLF), '').split(CRLF + CRLF);
      const valor = resto.join(CRLF + CRLF).replace(new RegExp(CRLF + '$'), '');
      const nome = /name="([^"]*)"/.exec(cabecalhos)?.[1];
      const nomeArquivo = /filename="([^"]*)"/.exec(cabecalhos)?.[1];
      const tipo = /Content-Type: *([^\r\n]+)/i.exec(cabecalhos)?.[1] || 'application/octet-stream';
      return { nome, nomeArquivo, tipo, valor };
    }).filter((p) => p.nome);
  };

  /** Multer: separa os pedaços, aplica filtro e limite, e grava no disco de mentira. */
  function criarMulter() {
    const MENSAGENS = {
      LIMIT_FILE_SIZE: 'File too large',
      LIMIT_FILE_COUNT: 'Too many files',
      LIMIT_UNEXPECTED_FILE: 'Unexpected field',
    };
    class MulterError extends Error {
      constructor(codigo, campo) {
        super(MENSAGENS[codigo] || codigo);
        this.name = 'MulterError';
        this.code = codigo;
        if (campo) this.field = campo;
      }
    }

    const sortearNome = () => Array.from({ length: 32 },
      () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');

    const multer = (opcoes = {}) => {
      const guardar = (req, file, conteudo, pronto) => {
        const armazem = opcoes.storage;
        const escolher = (fn, padrao) => new Promise((resolver) => {
          if (typeof fn !== 'function') return resolver(padrao);
          return fn(req, file, (erro, valor) => resolver(erro ? padrao : valor));
        });
        Promise.all([
          escolher(armazem && armazem.destination, opcoes.dest || '/tmp'),
          escolher(armazem && armazem.filename, sortearNome()),
        ]).then(([destino, nome]) => {
          fs.mkdirSync(destino, { recursive: true });
          const caminho = path.join(destino, nome);
          fs.writeFileSync(caminho, conteudo);
          Object.assign(file, { destination: destino, filename: nome, path: caminho });
          pronto();
        });
      };

      const receber = (campos, umSo) => (req, res, next) => {
        const partes = analisar(req.corpoBruto, req.headers['content-type']);
        req.body = {};
        for (const p of partes) if (p.nomeArquivo === undefined) req.body[p.nome] = p.valor;

        const arquivos = partes.filter((p) => p.nomeArquivo !== undefined
          && (campos === null || campos.includes(p.nome)));
        if (!arquivos.length) return next();

        const pendentes = [];
        for (const parte of arquivos) {
          const file = {
            fieldname: parte.nome, originalname: parte.nomeArquivo, encoding: '7bit',
            mimetype: parte.tipo, size: parte.valor.length,
          };
          if (opcoes.limits && opcoes.limits.fileSize !== undefined && file.size > opcoes.limits.fileSize)
            return next(new MulterError('LIMIT_FILE_SIZE', parte.nome));
          if (typeof opcoes.fileFilter === 'function') {
            let recusa = null;
            let aceito = true;
            opcoes.fileFilter(req, file, (erro, ok) => { recusa = erro; aceito = ok !== false; });
            if (recusa) return next(recusa);
            if (!aceito) continue;
          }
          pendentes.push(new Promise((ok) => guardar(req, file, parte.valor, () => ok(file))));
        }
        if (!pendentes.length) return next();
        return Promise.all(pendentes).then((prontos) => {
          if (umSo) req.file = prontos[0]; else req.files = prontos;
          next();
        });
      };

      return {
        single: (campo) => receber([campo], true),
        array: (campo) => receber([campo], false),
        fields: (lista) => receber(lista.map((c) => c.name), false),
        any: () => receber(null, false),
        none: () => receber([], false),
      };
    };

    multer.diskStorage = (cfg) => ({ ...cfg, _tipo: 'disco' });
    multer.memoryStorage = () => ({ _tipo: 'memoria' });
    multer.MulterError = MulterError;
    return multer;
  }

  return { Blob, FormData, Buffer, serializar, multer: criarMulter() };
}

/** `require` do sandbox: módulos internos imitados + arquivos do disco de mentira. */
function criarRequire(caixa, path, fs, os, http, bibliotecas, pastaBase) {
  const cache = new Map();

  const carregarArquivo = (caminho) => {
    if (cache.has(caminho)) return cache.get(caminho);
    const codigo = fs.readFileSync(caminho, 'utf8');
    if (caminho.endsWith('.json')) {
      const dados = JSON.parse(codigo);
      cache.set(caminho, dados);
      return dados;
    }
    const modulo = { exports: {} };
    cache.set(caminho, modulo.exports);
    const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', 'console', 'process', codigo);
    // O require de dentro do arquivo resolve './x' a partir da pasta DELE, não da de quem chamou.
    fn(modulo, modulo.exports, requerirDe(path.dirname(caminho)), path.dirname(caminho), caminho,
       caixa.console, caixa.process);
    cache.set(caminho, modulo.exports);
    return modulo.exports;
  };

  const requerirDe = (base) => function requerir(nome) {
    const limpo = String(nome).replace(/^node:/, '');
    if (limpo === 'path' || limpo === 'path/posix') return path;
    if (limpo === 'fs') return fs;
    if (limpo === 'fs/promises') return fs.promises;
    if (limpo === 'os') return os;
    if (limpo === 'http') return http;
    if (bibliotecas[limpo]) return bibliotecas[limpo];
    if (limpo === 'util') return { inspect: (v) => String(v), format: (...a) => a.join(' ') };
    if (/^[./]/.test(nome)) return carregarArquivo(path.resolve(base, nome));
    const nota = new Error(
      `O módulo "${nome}" só existe no Node de verdade — este exemplo é para rodar no terminal.`,
    );
    nota.soNoTerminal = true;
    throw nota;
  };

  return requerirDe(pastaBase);
}

/** Corpo da requisição e cabeçalhos, para o `fetch` da caixa conversar com o Express. */
function moduloEjs(fs) {
  /** Compila um template EJS: <%= escapado %>, <%- cru %>, <% código %>. */
  const compilar = (fonte, opcoes = {}) => {
    let corpo = "let __s='';";
    let resto = fonte;
    while (resto.length) {
      const i = resto.indexOf('<%');
      if (i === -1) { corpo += '__s+=' + JSON.stringify(resto) + ';'; break; }
      corpo += '__s+=' + JSON.stringify(resto.slice(0, i)) + ';';
      const fim = resto.indexOf('%>', i);
      const tag = resto.slice(i + 2, fim);
      resto = resto.slice(fim + 2);
      if (tag[0] === '=') corpo += `__s+=__esc(${tag.slice(1)});`;
      else if (tag[0] === '-') corpo += `__s+=(${tag.slice(1)});`;
      else corpo += tag + '\n';
    }
    corpo += 'return __s;';
    return (dados) => {
      const escapar = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      // include('cabecalho') procura o arquivo ao lado do template que está sendo renderizado
      const incluir = (nome, extras = {}) => {
        const pasta = opcoes.filename ? opcoes.filename.replace(/\/[^/]*$/, '') : '';
        const alvo = (pasta ? pasta + '/' : '') + (nome.endsWith('.ejs') ? nome : nome + '.ejs');
        return compilar(fs.readFileSync(alvo, 'utf8'), { filename: alvo })({ ...dados, ...extras });
      };
      const chaves = Object.keys(dados);
      return new Function('__esc', 'include', ...chaves, corpo)(escapar, incluir, ...chaves.map((k) => dados[k]));
    };
  };
  return {
    render: (fonte, dados = {}, opcoes = {}) => compilar(fonte, opcoes)(dados),
    renderFile: (caminho, dados, cb) => cb(null, compilar(fs.readFileSync(caminho, 'utf8'), { filename: caminho })(dados)),
    compile: compilar,
  };
}

/** Express enxuto: rotas, middlewares, Router, params/query/body, send/json/render/redirect. */
function moduloExpress(http, path, fs, ejs) {
  const METODOS = ['get', 'post', 'put', 'patch', 'delete', 'all'];

  /** '/produtos/:id' vira uma expressão que casa a URL e nomeia os pedaços. */
  const compilarCaminho = (caminho) => {
    const nomes = [];
    const fonte = caminho
      .replace(/[.+?^$()|[\]\\]/g, '\\$&')
      .replace(/\{([^}]*)\}/g, (_, dentro) => `(?:${dentro})?`)     // Express 5: {/:id} é opcional
      .replace(/\*([A-Za-z_]\w*)/g, (_, nome) => { nomes.push(nome); return '(.*)'; })   // curinga: {*resto}
      .replace(/:([A-Za-z_]\w*)/g, (_, nome) => { nomes.push(nome); return '([^/]+)'; });
    return { regex: new RegExp('^' + fonte + '/?$'), nomes };
  };

  const casar = (camada, url) => {
    if (camada.prefixo) return url === camada.prefixo || url.startsWith(camada.prefixo + '/') ? {} : null;
    if (!camada.caminho) return {};
    const m = camada.regex.exec(url);
    if (!m) return null;
    const params = {};
    // parâmetro opcional que não veio na URL não entra em req.params — igual ao Express
    camada.nomes.forEach((n, i) => { if (m[i + 1] !== undefined) params[n] = decodeURIComponent(m[i + 1]); });
    return params;
  };

  function criarCamadas() {
    const camadas = [];
    const registrar = (metodo, caminho, fns, prefixo) => {
      for (const fn of fns.flat()) {
        const base = { metodo, fn, ehErro: typeof fn === 'function' && fn.length === 4, prefixo };
        camadas.push(caminho ? { ...base, caminho, ...compilarCaminho(caminho) } : base);
      }
    };
    return { camadas, registrar };
  }

  /** Percorre as camadas na ORDEM DE REGISTRO — é a regra que manda no Express. */
  function correr(camadas, req, res, aoFim) {
    let i = 0;
    const seguir = (erro) => {
      while (i < camadas.length) {
        const camada = camadas[i++];
        if (Boolean(erro) !== Boolean(camada.ehErro)) continue;
        if (camada.metodo && camada.metodo !== 'all' && camada.metodo !== req.method.toLowerCase()) continue;
        const params = casar(camada, req.caminho);
        if (!params) continue;
        req.params = { ...req.params, ...params };
        const urlAntes = req.url;
        if (camada.prefixo) {
          req.url = req.url.slice(camada.prefixo.length) || '/';
          req.caminho = req.path = req.url.split('?')[0];
        }
        try {
          const restaurar = () => { req.url = urlAntes; req.caminho = req.path = urlAntes.split('?')[0]; };
          if (camada.ehErro) return camada.fn(erro, req, res, (e) => { restaurar(); seguir(e); });
          return camada.fn(req, res, (e) => { restaurar(); seguir(e); });
        } catch (e) { return seguir(e); }
      }
      aoFim(erro);
    };
    seguir(null);
  }

  function criarRouter() {
    const { camadas, registrar } = criarCamadas();
    const router = { camadas, ehRouter: true };
    for (const metodo of METODOS) router[metodo] = (caminho, ...fns) => (registrar(metodo, caminho, fns), router);
    router.use = (a, ...b) => {
      const caminho = typeof a === 'string' ? a : null;
      const fns = typeof a === 'string' ? b : [a, ...b];
      for (const fn of fns.flat()) {
        // Router montado vira UMA camada: quando a URL casa com o prefixo, o pedido entra
        // nas camadas de dentro — que foram escritas sem o prefixo.
        if (fn && fn.ehRouter) {
          const dentro = (req, res, seguir) => correr(fn.camadas, req, res, (erro) => seguir(erro));
          camadas.push(caminho ? { prefixo: caminho, fn: dentro } : { fn: dentro });
        } else registrar(null, null, [fn], caminho);
      }
      return router;
    };
    return router;
  }

  function criarApp() {
    const raiz = criarRouter();
    const ajustes = {};

    const app = (req, res) => {
      const [caminho, consulta] = String(req.url).split('?');
      req.caminho = req.path = caminho;
      req.params = {};
      req.query = Object.fromEntries(new URLSearchParams(consulta || ''));
      req.app = app;
      res.locals = res.locals || {};
      enfeitarResposta(res, req, ajustes);
      correr(raiz.camadas, req, res, (erro) => {
        if (erro) { res.status(500).send(String(erro.message || erro)); return; }
        res.status(404).send(`Cannot ${req.method} ${req.caminho}`);
      });
    };

    for (const metodo of METODOS) app[metodo] = (...a) => (raiz[metodo](...a), app);
    app.use = (...a) => (raiz.use(...a), app);
    app.set = (chave, valor) => { ajustes[chave] = valor; return app; };
    app.listen = (porta, aoSubir) => http.createServer(app).listen(porta, aoSubir);
    app.locals = {};
    return app;
  }

  function enfeitarResposta(res, req, ajustes) {
    const cabecalhos = {};
    res.locals = res.locals || {};
    res.set = res.header = (nome, valor) => { cabecalhos[nome.toLowerCase()] = valor; res.setHeader(nome, valor); return res; };
    res.status = (codigo) => { res.statusCode = codigo; return res; };
    res.send = (corpo) => {
      if (corpo !== null && typeof corpo === 'object') return res.json(corpo);
      res.set('content-type', 'text/html; charset=utf-8');
      res.end(String(corpo ?? ''));
      return res;
    };
    res.json = (dados) => { res.set('content-type', 'application/json; charset=utf-8'); res.end(JSON.stringify(dados)); return res; };
    res.redirect = (destino) => { res.statusCode = 302; res.set('location', destino); res.end(''); return res; };
    res.render = (nome, dados = {}) => {
      const arquivo = path.join(ajustes.views || '/views', nome.endsWith('.ejs') ? nome : nome + '.ejs');
      res.send(ejs.render(fs.readFileSync(arquivo, 'utf8'), { ...res.locals, ...dados }, { filename: arquivo }));
      return res;
    };
  }

  const api = () => criarApp();
  api.Router = criarRouter;
  api.urlencoded = () => (req, res, next) => {
    req.body = Object.fromEntries(new URLSearchParams(req.corpoBruto || ''));
    next();
  };
  api.json = () => (req, res, next) => {
    // Igual ao de verdade: corpo que não é JSON ele nem olha, e req.body segue undefined.
    const tipo = String(req.headers['content-type'] || '');
    if (tipo && !tipo.includes('json')) return next();
    try { req.body = req.corpoBruto ? JSON.parse(req.corpoBruto) : {}; } catch { req.body = {}; }
    return next();
  };
  api.static = (pasta) => (req, res, next) => {
    const alvo = path.join(pasta, decodeURIComponent(req.caminho));
    if (!fs.existsSync(alvo) || fs.statSync(alvo).isDirectory()) return next();
    const tipo = {
      '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
      '.html': 'text/html; charset=utf-8', '.json': 'application/json; charset=utf-8',
    }[path.extname(alvo)];
    if (tipo) res.set('content-type', tipo);
    res.end(fs.readFileSync(alvo, 'utf8'));
  };
  return api;
}

/** express-session enxuto: cookie com o id, dados guardados no servidor. */
function moduloSessao() {
  const loja = new Map();          // id da sessão → dados (é o "store" do express-session)
  let contador = 0;
  return (opcoes = {}) => (req, res, next) => {
    const achado = /connect\.sid=([^;]+)/.exec(req.headers.cookie || '');
    let sid = achado && loja.has(achado[1]) ? achado[1] : null;
    if (!sid) {
      sid = 's' + ++contador;
      loja.set(sid, {});
      res.setHeader('set-cookie', `connect.sid=${sid}; Path=/; HttpOnly`);
    }
    req.sessionID = sid;
    req.session = loja.get(sid);
    req.session.destroy = (cb) => { loja.delete(sid); cb && cb(); };
    next();
  };
}

/** connect-flash: recado guardado na sessão, lido uma vez e apagado. */
function moduloFlash() {
  return () => (req, res, next) => {
    req.flash = (tipo, mensagem) => {
      const fila = (req.session.flash = req.session.flash || {});
      if (mensagem === undefined) { const guardado = fila[tipo] || []; delete fila[tipo]; return guardado; }
      (fila[tipo] = fila[tipo] || []).push(mensagem);
      return fila[tipo].length;
    };
    next();
  };
}

/** Mongoose enxuto: só o que o curso usa — schema, model, validação e os erros de sempre. */
function moduloMongoose() {
  const criarErro = (nome, mensagem, extras = {}) =>
    Object.assign(new Error(mensagem), { name: nome, ...extras });

  class Schema {
    constructor(campos) { this.campos = campos; }
  }

  /** Aplica trim/lowercase/default e junta os erros de required/min. */
  const conferir = (schema, dados) => {
    const erros = {};
    const limpo = {};
    for (const [campo, bruta] of Object.entries(schema.campos)) {
      const regra = typeof bruta === 'function' ? { type: bruta } : bruta;
      let valor = dados[campo];
      if (valor === undefined && regra.default !== undefined)
        valor = typeof regra.default === 'function' ? regra.default() : regra.default;
      if (typeof valor === 'string' && regra.trim) valor = valor.trim();
      if (typeof valor === 'string' && regra.lowercase) valor = valor.toLowerCase();
      if (regra.required && (valor === undefined || valor === '' || valor === null))
        erros[campo] = { message: `Path \`${campo}\` is required.` };
      else if (valor !== undefined && regra.min !== undefined && valor < regra.min)
        erros[campo] = { message: `Path \`${campo}\` (${valor}) is less than minimum allowed value (${regra.min}).` };
      if (valor !== undefined) limpo[campo] = valor;
    }
    return { erros, limpo };
  };

  const erroDeValidacao = (modelo, erros) => criarErro(
    'ValidationError',
    `${modelo} validation failed: ` + Object.entries(erros).map(([c, e]) => `${c}: ${e.message}`).join(', '),
    { errors: erros },
  );

  const modelos = new Map();
  const model = (nome, schema, collection) => {
    if (modelos.has(nome)) return modelos.get(nome);

    class Documento {
      constructor(dados = {}) {
        Object.assign(this, conferir(schema, dados).limpo);
        const hex = '65f1c2a4e8b9d1234567890a';
        this._id = { toString: () => hex, toHexString: () => hex };
      }
      async validate() {
        const { erros } = conferir(schema, this);
        if (Object.keys(erros).length) throw erroDeValidacao(nome, erros);
      }
      toObject() { return { ...this }; }
    }

    Documento.modelName = nome;
    // O Mongoose pluraliza em inglês: 'Fornecedor' vira 'fornecedors'.
    Documento.collection = { name: collection || nome.toLowerCase().replace(/y$/, 'ie') + 's' };
    Documento.create = async (dados) => {
      const doc = new Documento(dados);
      await doc.validate();
      return doc;                       // com banco de verdade, aqui ele iria para o MongoDB
    };
    Documento.findById = async (id) => {
      if (!/^[0-9a-fA-F]{24}$/.test(String(id)))
        throw criarErro('CastError', `Cast to ObjectId failed for value "${id}" (type ${typeof id}) at path "_id" for model "${nome}"`);
      return null;
    };
    modelos.set(nome, Documento);
    return Documento;
  };

  const conexao = (nome = '') => ({ readyState: 0, name: nome, asPromise: async () => ({ getClient: () => ({}) }) });

  return {
    Schema,
    model,
    connection: conexao(),
    createConnection: () => conexao(),
    connect: async (uri, opcoes = {}) => {
      const alvo = String(uri).replace(/^mongodb(\+srv)?:\/\//, '').split('/')[0];
      throw criarErro('MongooseServerSelectionError', `connect ECONNREFUSED ${alvo}`);
    },
    disconnect: async () => {},
    Types: { ObjectId: { isValid: (v) => /^[0-9a-fA-F]{24}$/.test(String(v)) } },
  };
}

/* ═══ Execução em sandbox ════════════════════════════════════════ */
const LIMITE_MS = 6000;   // tempo máximo que um exemplo pode ficar produzindo saída
const TETO_TIMER = 2500;  // encurta esperas longas para o feedback ser rápido

/**
 * Roda `codigo` capturando console/process.stdout, inclusive saída assíncrona.
 * Devolve { cancelar } e avisa por `aoLinha` / `aoFim`.
 */
function executar(codigo, aoLinha, aoFim, contexto = {}) {
  let vivo = true, tardio = false, pendentes = 0, parcial = '', intervalos = new Set(), falhou = false;
  let relogioFim = null;

  // No node, cada bloco roda num processo novo. Aqui todos dividem a mesma página, então um
  // exemplo que cria variável global sem querer (`Antiga('x')` sem `new`, que faz o `this`
  // virar o global) contaminaria o próximo. Guardamos a lista de antes para limpar no fim —
  // durante a execução o global sujo continua visível, porque é justamente a lição do exemplo.
  const globaisAntes = new Set(Object.getOwnPropertyNames(globalThis));
  const limparGlobais = () => {
    for (const chave of Object.getOwnPropertyNames(globalThis))
      if (!globaisAntes.has(chave)) { try { delete globalThis[chave]; } catch {} }
  };
  const emitir = (tipo, txt) => { if (vivo) aoLinha({ tipo, txt, tardio }); };

  // Um fluxo só, igual ao stdout do node: a linha fecha no \n, venha de onde vier.
  const escrever = (s) => {
    parcial += s;
    const partes = parcial.split('\n');
    parcial = partes.pop();
    partes.forEach((p) => emitir('log', p));
  };
  const descarregar = () => { if (parcial) { emitir('log', parcial); parcial = ''; } };

  // ── Fila de saída ────────────────────────────────────────────────
  // Normalmente é síncrona e não muda nada. Ela só espera quando o exemplo imprime uma
  // Promise que o sandbox não criou — a de uma função `async`, que nasce da Promise interna
  // do motor e não dá para instrumentar. O estado dela só se descobre deixando o laço de
  // microtarefas dar uma volta, e aí a linha teria que sair fora de ordem. Por isso as
  // linhas seguintes esperam na fila até essa sondagem terminar.
  const naoObservada = (x) => x instanceof Promise && !ESTADO_PROMESSA.has(x);
  let filaSaida = [], bombeando = false;

  // Uma Promise já assentada avisa o `.then` na PRIMEIRA microtarefa; uma que ainda vai
  // assentar avisa depois. É essa diferença de ordem que revela o estado no momento do log.
  const sondarPromessa = (promessa, pronto) => {
    const reg = { estado: 'pendente', valor: undefined };
    let volta = 0;
    promessa.then(
      (valor) => { if (volta === 0) { reg.estado = 'cumprida'; reg.valor = valor; } },
      (erro) => { if (volta === 0) { reg.estado = 'rejeitada'; reg.valor = erro; } },
    );
    queueMicrotask(() => { volta = 1; });
    queueMicrotask(() => queueMicrotask(() => { ESTADO_PROMESSA.set(promessa, reg); pronto(); }));
  };

  const despachar = (valores, correr) => { filaSaida.push({ valores, correr }); if (!bombeando) bombear(); };

  function bombear() {
    bombeando = true;
    while (filaSaida.length) {
      const tarefa = filaSaida[0];
      const alvo = tarefa.valores?.find(naoObservada);
      if (alvo) {
        bombeando = false;
        pendentes++;
        sondarPromessa(alvo, () => { pendentes--; bombear(); talvezEncerrar(); });
        return;
      }
      filaSaida.shift();
      tarefa.correr();
    }
    bombeando = false;
  }

  const encerrar = (motivo) => {
    if (!vivo) return;
    vivo = false; clearTimeout(relogioFim);
    intervalos.forEach(clearInterval);
    limparGlobais();
    aoFim({ falhou, motivo });
  };
  const talvezEncerrar = () => {
    if (!vivo) return;
    clearTimeout(relogioFim);
    // espera um tique: código pode agendar novos timers dentro do callback
    relogioFim = setTimeout(() => {
      // intervalo vivo é saída que ainda vai vir: só fecha quando o exemplo der clearInterval
      if (pendentes === 0 && intervalos.size === 0) { descarregar(); encerrar(null); }
    }, 60);
  };

  const proteger = (fn) => (...a) => {
    try { fn(...a); } catch (e) { falhou = true; emitir('erro', `${e.name}: ${e.message}`); }
  };

  // Endereço de mentira, só para __dirname e process.cwd() saírem como sairiam no seu computador.
  const RAIZ = '/Users/igor/Cursos';
  const path = moduloPath();
  const { fs } = moduloFs(path);
  const os = { tmpdir: () => '/tmp', homedir: () => '/Users/igor', platform: () => 'darwin', EOL: '\n' };
  const arquivoAbs = RAIZ + '/' + (contexto.arquivo || 'exemplo.js');
  const cursoAbs = RAIZ + '/' + (contexto.arquivo || '').split('/')[0];

  const caixa = {
    console: {
      log: (...a) => despachar(a, () => escrever(a.map((x) => inspecionar(x)).join(' ') + '\n')),
      info: (...a) => caixa.console.log(...a),
      warn: (...a) => caixa.console.log(...a),
      debug: (...a) => caixa.console.log(...a),
      error: (...a) => despachar(a, () => {
        descarregar(); falhou = true; emitir('erro', a.map((x) => inspecionar(x)).join(' '));
      }),
      table: (d) => despachar([d], () => escrever((d && typeof d === 'object' ? montarTabela(d) : inspecionar(d)) + '\n')),
    },
    process: {
      // passa pela mesma fila do console, senão furaria a ordem quando há sondagem em curso
      stdout: { write: (s) => { despachar(null, () => escrever(String(s))); return true; } },
      argv: ['node', arquivoAbs],
      env: { USER: 'igor', HOME: '/Users/igor', SHELL: '/bin/zsh' },
      cwd: () => cursoAbs,
      platform: 'darwin',
      version: 'v22.22.2',
      on: () => {},
      exit: () => {},
    },
    setTimeout: (fn, ms, ...a) => {
      pendentes++;
      return setTimeout(() => { pendentes--; if (vivo) { proteger(fn)(...a); talvezEncerrar(); } }, Math.min(ms || 0, TETO_TIMER));
    },
    setInterval: (fn, ms, ...a) => {
      const id = setInterval(() => { if (vivo) proteger(fn)(...a); }, Math.max(Math.min(ms || 0, TETO_TIMER), 16));
      intervalos.add(id); return id;
    },
    clearTimeout: (id) => { clearTimeout(id); if (id != null) { pendentes = Math.max(0, pendentes - 1); talvezEncerrar(); } },
    clearInterval: (id) => { clearInterval(id); intervalos.delete(id); talvezEncerrar(); },
    queueMicrotask,
    // Promise que anota o próprio estado, para o console.log imprimir
    // `Promise { 42 }` como o node, em vez de `{}`.
    // O species volta a ser a Promise nativa: sem isso, cada `.then` criaria outra
    // promessa observada, que se registraria de novo, sem fim.
    Promise: class extends Promise {
      static get [Symbol.species]() { return Promise; }
      constructor(executor) {
        super(executor);
        const reg = { estado: 'pendente', valor: undefined };
        ESTADO_PROMESSA.set(this, reg);
        this.then(
          (valor) => { reg.estado = 'cumprida'; reg.valor = valor; },
          (erro) => { reg.estado = 'rejeitada'; reg.valor = erro; },
        );
      }
    },
  };
  const { http, buscar } = moduloHttp(caixa.setTimeout);
  const ejs = moduloEjs(fs);
  const envio = moduloMultipart(fs, path);
  const bibliotecas = {
    ejs,
    express: moduloExpress(http, path, fs, ejs),
    'express-session': moduloSessao(),
    'connect-flash': moduloFlash(),
    mongoose: moduloMongoose(),
    bcryptjs: moduloBcrypt(),
    jsonwebtoken: moduloJwt(),
    sequelize: moduloSequelize(path),
    multer: envio.multer,
  };
  const requerir = criarRequire(caixa, path, fs, os, http, bibliotecas, path.dirname(arquivoAbs));

  try {
    // Sem "use strict": o node roda estes arquivos em modo sloppy, e alguns exemplos
    // dependem disso (Object.freeze que falha calado, `this` quando se esquece o `new`).
    const fn = new Function(
      'console', 'process', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'queueMicrotask',
      'Promise', 'require', '__dirname', '__filename', 'fetch', 'FormData', 'Blob', 'Buffer', codigo,
    );
    fn(caixa.console, caixa.process, caixa.setTimeout, caixa.setInterval, caixa.clearTimeout,
       caixa.clearInterval, caixa.queueMicrotask, caixa.Promise,
       requerir, path.dirname(arquivoAbs), arquivoAbs, buscar, envio.FormData, envio.Blob, envio.Buffer);
    descarregar();
  } catch (e) {
    descarregar();
    if (e && e.soNoTerminal) {                    // módulo que só existe no Node de verdade
      emitir('nota', e.message);
      encerrar('nota'); return { cancelar: () => {} };
    }
    falhou = true;
    emitir('erro', e instanceof Error ? `${e.name}: ${e.message}` : String(e));
    encerrar(null); return { cancelar: () => {} };
  }

  // Daqui para a frente, o que sair é assíncrono (aparece marcado com ⏱ no terminal).
  tardio = true;
  if (pendentes === 0 && intervalos.size === 0) {
    // Sem timer pendente, mas pode haver Promise no meio do caminho (um `await` que ainda
    // não voltou). Uma volta no laço de eventos resolve todas elas antes de fechar.
    setTimeout(() => {
      if (!vivo) return;
      if (pendentes === 0 && intervalos.size === 0) { descarregar(); encerrar(null); return; }
      setTimeout(() => encerrar(pendentes || intervalos.size ? 'tempo' : null), LIMITE_MS);
      talvezEncerrar();
    }, 0);
  } else {
    setTimeout(() => encerrar(pendentes || intervalos.size ? 'tempo' : null), LIMITE_MS);
    talvezEncerrar();
  }
  return { cancelar: () => encerrar('cancelado') };
}

/** Cada bloco é autossuficiente: roda sozinho, sem nada de antes. */
const montarExecutavel = (topico, i) => codigoDoBloco(topico, i);

/** O arquivo inteiro, como o node rodaria. */
const montarArquivo = (topico) => topico.blocos.map((_, i) => codigoDoBloco(topico, i)).join('\n\n');
const chaveEdicao = (topico, i) => `${topico.id}#${i}`;
const codigoDoBloco = (topico, i) => edicoes[chaveEdicao(topico, i)] ?? topico.blocos[i].codigo;

/* ═══ Terminal ═══════════════════════════════════════════════════ */
function criarTerminal(comando) {
  const el = document.createElement('div');
  el.className = 'terminal';
  el.innerHTML = `<div class="terminal-barra"><span>terminal</span><button class="limpar">limpar</button></div><div class="saida"></div>`;
  const saida = $('.saida', el);
  const convite = `<div class="fim">aguardando · aperte <b>Rodar</b> (ou ⌘↵ dentro do editor)</div>`;
  saida.innerHTML = convite;
  $('.limpar', el).onclick = () => { saida.innerHTML = convite; };

  const api = {
    el,
    inicio() {
      saida.innerHTML = `<div class="cmd">${esc(comando)}</div>`;
      api.rodada = document.createElement('div');
      saida.append(api.rodada);
    },
    linha({ tipo, txt, tardio }) {
      const div = document.createElement('div');
      div.className = 'linha' + (tipo === 'erro' ? ' err' : tipo === 'nota' ? ' nota' : '') + (tardio ? ' tardia' : '');
      const marcador = tipo === 'nota' ? 'ⓘ' : tardio ? '⏱' : '›';
      div.innerHTML = `<span class="marcador">${marcador}</span><span class="txt">${tipo === 'nota' ? esc(txt) : colorirSaida(txt)}</span>`;
      api.rodada.append(div);
      el.scrollTop = el.scrollHeight;
    },
    fim({ falhou, motivo }, ms) {
      const div = document.createElement('div');
      div.className = 'fim' + (falhou ? ' ruim' : '');
      const status = motivo === 'tempo' ? 'interrompido no limite de 6s'
        : motivo === 'cancelado' ? 'cancelado'
        : motivo === 'nota' ? `rode no terminal: ${comando}`
        : falhou ? 'terminou com erro' : 'concluído';
      div.className = 'fim' + (falhou ? ' ruim' : motivo === 'nota' ? ' aviso' : '');
      div.innerHTML = `<b>${falhou ? '✕' : motivo === 'nota' ? 'ⓘ' : '✓'}</b> ${status} · ${ms}ms`;
      saida.append(div);
      el.scrollTop = el.scrollHeight;
    },
  };
  return api;
}

/* ═══ Editor de código ═══════════════════════════════════════════ */
function criarEditor(topico, indice) {
  const original = topico.blocos[indice].codigo;
  const wrap = document.createElement('div');
  wrap.className = 'editor';
  wrap.innerHTML = `
    <div class="editor-barra">
      <div class="pontos"><i></i><i></i><i></i></div>
      <span class="editor-nome">${esc(topico.slug)}.js · bloco ${indice + 1}</span>
      <div class="dir">
        <span class="mexido" hidden>editado</span>
        <button class="btn resetar" hidden>↺ original</button>
        <button class="btn primario rodar">▶ Rodar</button>
      </div>
    </div>
    <div class="codigo-area"><pre><code></code></pre><textarea spellcheck="false" aria-label="código editável"></textarea></div>`;

  const pre = $('pre', wrap), code = $('code', wrap), area = $('textarea', wrap);
  const btnRodar = $('.rodar', wrap), btnResetar = $('.resetar', wrap), selo = $('.mexido', wrap);
  const terminal = criarTerminal(topico.comando);
  wrap.append(terminal.el);

  const pintar = () => {
    code.innerHTML = realcar(area.value) + '\n';
    area.style.height = pre.scrollHeight + 'px';
    selo.hidden = btnResetar.hidden = area.value === original;
  };
  const definir = (txt) => { area.value = txt; pintar(); };

  area.addEventListener('input', () => {
    pintar();
    if (area.value === original) delete edicoes[chaveEdicao(topico, indice)];
    else edicoes[chaveEdicao(topico, indice)] = area.value;
    guardar('edicoes', edicoes);
  });
  area.addEventListener('scroll', () => { pre.scrollLeft = area.scrollLeft; });
  area.addEventListener('focus', () => wrap.classList.add('editando'));
  area.addEventListener('blur', () => wrap.classList.remove('editando'));
  area.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {                                    // Tab digita indentação, não pula o foco
      e.preventDefault();
      const { selectionStart: a, selectionEnd: b } = area;
      area.value = area.value.slice(0, a) + '  ' + area.value.slice(b);
      area.selectionStart = area.selectionEnd = a + 2;
      area.dispatchEvent(new Event('input'));
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); rodar(); }
  });

  btnResetar.onclick = () => {
    delete edicoes[chaveEdicao(topico, indice)];
    guardar('edicoes', edicoes);
    definir(original);
  };

  let emAndamento = null;
  function rodar() {
    emAndamento?.cancelar();
    btnRodar.disabled = true;
    btnRodar.textContent = '● rodando';
    terminal.inicio();
    const t0 = performance.now();
    emAndamento = executar(
      montarExecutavel(topico, indice),
      (l) => terminal.linha(l),
      (r) => {
        terminal.fim(r, Math.round(performance.now() - t0));
        btnRodar.disabled = false;
        btnRodar.textContent = '▶ Rodar';
        emAndamento = null;
      },
      { arquivo: topico.arquivo },
    );
  }
  btnRodar.onclick = rodar;

  definir(codigoDoBloco(topico, indice));
  return { wrap, rodar, remedir: pintar };
}

/* ═══ Barra lateral ══════════════════════════════════════════════ */
function montarArvore() {
  const nav = $('#arvore');
  nav.innerHTML = '';
  for (const curso of CURSOS) {
    const doCurso = TODOS.filter((t) => t.curso === curso);
    const feitosCurso = doCurso.filter((t) => feitos.has(t.id)).length;

    const cabeca = document.createElement('div');
    cabeca.className = 'curso-cabeca';
    cabeca.style.setProperty('--cc', curso.cor);
    cabeca.innerHTML = `
      <a class="curso-linha" href="#/curso/${curso.slug}">
        <span class="curso-selo">${esc(curso.selo ?? curso.slug)}</span>
        <span class="curso-txt"><b>${esc(curso.titulo)}</b><small>${esc(curso.subtitulo ?? '')}</small></span>
        <span class="curso-cont">${feitosCurso}/${doCurso.length}</span>
      </a>
      ${curso.depoisDe ? `<p class="curso-pre">↳ continua depois de ${esc(nomeDoCurso(curso.depoisDe))}</p>` : ''}`;
    nav.append(cabeca);

    for (const tema of curso.temas) {
      const bloco = document.createElement('div');
      bloco.style.setProperty('--c', tema.cor);
      const nFeitos = tema.topicos.filter((t) => feitos.has(`${curso.slug}/${tema.slug}/${t.slug}`)).length;
      bloco.innerHTML = `
        <button class="tema-cabeca" aria-expanded="false">
          <span class="tema-icone">${esc(tema.icone)}</span>
          <span class="tema-nome">${esc(tema.titulo)}</span>
          <span class="tema-cont">${nFeitos}/${tema.topicos.length}</span>
          <span class="seta">▶</span>
        </button>
        <div class="tema-lista">${tema.topicos.map((t, i) => {
          const id = `${curso.slug}/${tema.slug}/${t.slug}`;
          return `<a class="link-topico${feitos.has(id) ? ' feito' : ''}" href="#/${id}" data-id="${id}">
            <span class="num">${String(i + 1).padStart(2, '0')}</span><span class="rotulo">${esc(t.titulo)}</span></a>`;
        }).join('')}</div>`;
      $('.tema-cabeca', bloco).onclick = (e) => {
        const b = e.currentTarget;
        b.setAttribute('aria-expanded', b.getAttribute('aria-expanded') === 'false');
      };
      nav.append(bloco);
    }
  }
  atualizarProgresso();
}

function atualizarProgresso() {
  const total = TODOS.length, n = TODOS.filter((t) => feitos.has(t.id)).length;
  const pct = total ? Math.round((n / total) * 100) : 0;
  const volta = 2 * Math.PI * 16;
  const arco = $('#arco');
  arco.setAttribute('stroke-dasharray', volta.toFixed(1));
  arco.setAttribute('stroke-dashoffset', (volta * (1 - pct / 100)).toFixed(1));
  $('#pct').textContent = pct + '%';
  $('#prog-n').textContent = `${n} de ${total} tópicos`;
}

function marcarAtivo(id) {
  document.querySelectorAll('.link-topico').forEach((a) => {
    const eu = a.dataset.id === id;
    a.classList.toggle('ativo', eu);
    if (eu) {
      a.closest('.tema-lista').previousElementSibling.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(() => a.scrollIntoView({ block: 'nearest' }));
    }
  });
}

/* ═══ Página inicial ═════════════════════════════════════════════ */
/** Barra de progresso de um curso, usada na capa e na página do curso. */
function barraCurso(curso) {
  const doCurso = TODOS.filter((t) => t.curso === curso);
  const n = doCurso.filter((t) => feitos.has(t.id)).length;
  const pct = doCurso.length ? Math.round((n / doCurso.length) * 100) : 0;
  return { n, total: doCurso.length, pct, doCurso, html:
    `<div class="barra" title="${n} de ${doCurso.length} estudados"><i style="width:${pct}%"></i></div>` };
}

/** Cartão de um tema, do jeito que aparece na grade. */
const cartaoTema = (curso, tema) => `
  <a class="cartao-tema" style="--c:${tema.cor}" href="#/${curso.slug}/${tema.slug}/${tema.topicos[0].slug}">
    <div class="topo">
      <span class="tema-icone">${esc(tema.icone)}</span>
      <h3>${esc(tema.titulo)}</h3>
      <span class="cartao-cont">${tema.topicos.filter((t) => feitos.has(`${curso.slug}/${tema.slug}/${t.slug}`)).length}/${tema.topicos.length}</span>
    </div>
    ${tema.resumo ? `<p class="cartao-resumo">${esc(tema.resumo)}</p>` : ''}
    <ul>${tema.topicos.map((t) => `<li>${esc(t.titulo)}</li>`).join('')}</ul>
  </a>`;

/** Faixa de apresentação do curso: número da trilha, resumo, progresso e o botão de continuar. */
function faixaCurso(curso, ordem) {
  const { n, total, pct, doCurso, html } = barraCurso(curso);
  const seguir = doCurso.find((t) => !feitos.has(t.id)) ?? doCurso[0];
  const rotulo = n === 0 ? 'Começar' : n === total ? 'Revisar' : 'Continuar';
  return `
    <div class="curso-topo" style="--cc:${curso.cor}">
      <div class="curso-id">
        <span class="curso-selo grande">${esc(curso.selo ?? curso.slug)}</span>
        <div>
          <span class="curso-etapa">Trilha ${ordem}${curso.depoisDe ? ` · depois de ${esc(nomeDoCurso(curso.depoisDe))}` : ''}</span>
          <h3>${esc(curso.titulo)} <small>${esc(curso.subtitulo ?? '')}</small></h3>
        </div>
      </div>
      <p class="curso-resumo">${esc(curso.resumo ?? '')}</p>
      ${curso.exigencia ? `<p class="curso-exigencia"><b>Vem depois de ${esc(nomeDoCurso(curso.depoisDe))}.</b> ${esc(curso.exigencia)}</p>` : ''}
      <div class="curso-linha-baixo">
        ${html}
        <span class="curso-num">${n}/${total} tópicos</span>
        <a class="btn primario" href="#/${seguir.id}">${rotulo} · ${esc(seguir.titulo)} →</a>
      </div>
    </div>`;
}

function paginaInicial() {
  const nBlocos = TODOS.reduce((a, t) => a + t.blocos.length, 0);
  const proximo = TODOS.find((t) => !feitos.has(t.id)) ?? TODOS[0];

  $('#trilha').innerHTML = '<b>Início</b>';
  $('#palco').innerHTML = `
    <section class="capa">
      <p class="oi">Olá, Igor 👋</p>
      <h2>Tudo que você já aprendeu,<br>em um lugar só — e rodando.</h2>
      <p class="sub">Dois cursos em sequência: primeiro a linguagem, depois a linguagem no servidor.
        Cada exemplo é um caso real, editável, com terminal ao lado. Mude o código, aperte <b>Rodar</b>
        e veja o resultado na hora. Sem instalar nada.</p>
      <div class="numeros">
        <div class="numero"><b>${CURSOS.length}</b><span>cursos</span></div>
        <div class="numero"><b>${TODOS.length}</b><span>tópicos</span></div>
        <div class="numero"><b>${nBlocos}</b><span>exemplos</span></div>
        <div class="numero"><b>${TODOS.filter((t) => feitos.has(t.id)).length}</b><span>concluídos</span></div>
      </div>
      ${proximo ? `<p style="margin:-14px 0 30px"><a class="btn primario" href="#/${proximo.id}">
        ${feitos.size ? 'Continuar de onde parou' : 'Começar'} · ${esc(proximo.titulo)} →</a></p>` : ''}
    </section>

    ${CURSOS.map((curso, i) => `
      <section class="curso-secao">
        ${faixaCurso(curso, i + 1)}
        <div class="grade-temas">${curso.temas.map((tema) => cartaoTema(curso, tema)).join('')}</div>
      </section>`).join('<div class="seta-trilha" aria-hidden="true">↓</div>')}`;
  marcarAtivo(null);
}

/* ═══ Página do curso ════════════════════════════════════════════ */
function paginaCurso(curso) {
  const ordem = CURSOS.indexOf(curso) + 1;
  $('#trilha').innerHTML = `<a href="#/">Início</a><span class="esconde">/</span><b>${esc(curso.titulo)}</b>`;
  $('#palco').style.setProperty('--c', curso.cor);
  $('#palco').innerHTML = `
    <section class="curso-secao so">
      ${faixaCurso(curso, ordem)}
      <div class="grade-temas">${curso.temas.map((tema) => cartaoTema(curso, tema)).join('')}</div>
    </section>`;
  marcarAtivo(null);
  window.scrollTo(0, 0);
}

/* ═══ Página de tópico ═══════════════════════════════════════════ */
function paginaTopico(topico) {
  const { tema } = topico;
  const { curso } = topico;
  $('#trilha').innerHTML =
    `<a href="#/curso/${curso.slug}" class="trilha-curso-link" style="--cc:${curso.cor}">` +
    `<span class="curso-selo mini">${esc(curso.selo ?? curso.slug)}</span>${esc(curso.titulo)}</a>` +
    `<span class="esconde">/</span><span class="esconde">${esc(tema.titulo)}</span>` +
    `<span class="esconde">/</span><b>${esc(topico.titulo)}</b>`;

  const palco = $('#palco');
  palco.style.setProperty('--c', tema.cor);
  palco.innerHTML = `
    <header class="topico-cabeca">
      <div class="etiquetas">
        <a class="etiqueta curso" href="#/curso/${curso.slug}" style="--cc:${curso.cor}">${esc(curso.titulo)}</a>
        <span class="etiqueta destaque">${esc(tema.icone)} ${esc(tema.titulo)}</span>
        <span class="etiqueta">Sessão ${topico.sessao}</span>
        <span class="etiqueta arquivo">${esc(topico.arquivo)}</span>
      </div>
      <h2>${esc(topico.titulo)}</h2>
      <p class="oquee">${marcarCodigo(topico.oQueE)}</p>
    </header>

    <div class="usar">
      <div class="sim"><h4>✓ Quando usar</h4><p>${marcarCodigo(topico.quandoUsar)}</p></div>
      <div class="nao"><h4>✕ Quando não usar</h4><p>${marcarCodigo(topico.quandoNaoUsar)}</p></div>
    </div>


    <div id="blocos"></div>

    <section class="arquivo-todo">
      <div class="arquivo-todo-cabeca">
        <div>
          <strong>Rodar o arquivo inteiro</strong>
          <small>a mesma saída que você veria no terminal com <code>${esc(topico.comando)}</code></small>
        </div>
        <button class="btn primario" id="rodar-tudo">▶ Rodar tudo</button>
      </div>
    </section>

    <section class="resumo">
      <h3>Resumo</h3>
      <p class="sub">O que levar para a vida real</p>
      <ol>${topico.resumo.map((l) => `<li>${marcarCodigo(l)}</li>`).join('')}</ol>
    </section>

    <div class="marcar-feito">
      <button class="btn ${feitos.has(topico.id) ? '' : 'primario'}" id="btn-feito">
        ${feitos.has(topico.id) ? '✓ Estudado — desmarcar' : 'Marcar como estudado'}
      </button>
    </div>

    <nav class="rodape">
      ${topico.anterior ? `<a href="#/${topico.anterior.id}"><small>${topico.anterior.curso !== curso
          ? `← Volta para ${esc(topico.anterior.curso.titulo)}` : '← Anterior'}</small>
        <b>${esc(topico.anterior.titulo)}</b></a>` : '<span class="vazio"></span>'}
      ${topico.proximo ? `<a class="frente${topico.proximo.curso !== curso ? ' troca-curso' : ''}" href="#/${topico.proximo.id}">
        <small>${topico.proximo.curso !== curso
          ? `Fim de ${esc(curso.titulo)} · começa ${esc(topico.proximo.curso.titulo)} →` : 'Próximo →'}</small>
        <b>${esc(topico.proximo.titulo)}</b></a>` : '<span class="vazio"></span>'}
    </nav>`;

  const alvo = $('#blocos');
  const editores = [];

  const montarBloco = (b, i) => {
    const secao = document.createElement('section');
    secao.className = 'bloco';
    secao.id = 'bloco-' + i;
    secao.innerHTML = `<div class="bloco-cabeca">
      <span class="bloco-n">${b.n}</span>
      <h3>${marcarCodigo(b.titulo)}</h3>
      <a class="ancora" href="#bloco-${i}" title="link direto">#</a>
    </div>`;
    const ed = criarEditor(topico, i);
    editores[i] = ed;
    secao.append(ed.wrap);
    return secao;
  };

  // Agrupa mantendo a ordem em que as seções aparecem no arquivo.
  const grupos = [];
  topico.blocos.forEach((b, i) => {
    const nome = b.secao || 'ESSENCIAL';
    let g = grupos.find((x) => x.nome === nome);
    if (!g) grupos.push((g = { nome, itens: [] }));
    g.itens.push([b, i]);
  });

  const LEGENDA = {
    ESSENCIAL: 'o mínimo para dizer que você sabe',
    'NA PRÁTICA': 'onde isso aparece no trabalho de verdade',
    PEGADINHAS: 'o que costuma dar errado',
  };

  grupos.forEach((g, ordem) => {
    const aberto = ordem === 0;                       // só a primeira seção nasce aberta
    const cx = document.createElement('details');
    cx.className = 'secao' + (aberto ? ' primeira' : '');
    cx.open = aberto;
    cx.innerHTML = `<summary>
      <span class="secao-seta">▶</span>
      <span class="secao-nome">${esc(g.nome)}</span>
      <span class="secao-legenda">${esc(LEGENDA[g.nome] ?? '')}</span>
      <span class="secao-cont">${g.itens.length}</span>
    </summary><div class="secao-corpo"></div>`;
    const corpo = $('.secao-corpo', cx);
    g.itens.forEach(([b, i]) => corpo.append(montarBloco(b, i)));
    // dentro de <details> fechado o editor mede altura 0; refaz a conta ao abrir
    cx.addEventListener('toggle', () => { if (cx.open) g.itens.forEach(([, i]) => editores[i].remedir()); }, { once: false });
    alvo.append(cx);
  });

  // ─── Rodar o arquivo inteiro, num terminal só ───
  const tudo = criarTerminal(topico.comando);
  tudo.el.hidden = true;                       // só aparece depois do primeiro run
  $('.arquivo-todo').append(tudo.el);
  const btnTudo = $('#rodar-tudo');
  let rodadaTudo = null;
  btnTudo.onclick = () => {
    rodadaTudo?.cancelar();
    btnTudo.disabled = true; btnTudo.textContent = '● rodando';
    tudo.el.hidden = false;
    tudo.inicio();
    const t0 = performance.now();
    rodadaTudo = executar(montarArquivo(topico), (l) => tudo.linha(l), (r) => {
      tudo.fim(r, Math.round(performance.now() - t0));
      btnTudo.disabled = false; btnTudo.textContent = '▶ Rodar tudo';
      rodadaTudo = null;
    }, { arquivo: topico.arquivo });
  };

  $('#btn-feito').onclick = () => {
    feitos.has(topico.id) ? feitos.delete(topico.id) : feitos.add(topico.id);
    guardar('feitos', [...feitos]);
    montarArvore();
    marcarAtivo(topico.id);
    const b = $('#btn-feito');
    const ok = feitos.has(topico.id);
    b.textContent = ok ? '✓ Estudado — desmarcar' : 'Marcar como estudado';
    b.classList.toggle('primario', !ok);
  };

  marcarAtivo(topico.id);
}

/* ═══ Busca ══════════════════════════════════════════════════════ */
const NORM = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const ITENS = TODOS.flatMap((t) => [
  { topico: t, tipo: 'topico', rotulo: t.titulo, contexto: `${t.curso.titulo} · ${t.tema.titulo} · ${t.oQueE}`, ancora: '' },
  ...t.blocos.map((b, i) => ({ topico: t, tipo: 'bloco', rotulo: b.titulo, contexto: `${t.curso.titulo} · ${t.titulo} · exemplo ${b.n}`, ancora: '' })),
]).map((i) => ({ ...i, chave: NORM(i.rotulo + ' ' + i.contexto) }));

let selecionado = 0, achados = [];

function buscar(termo) {
  const t = NORM(termo.trim());
  achados = !t ? ITENS.filter((i) => i.tipo === 'topico').slice(0, 8)
    : ITENS.filter((i) => t.split(/\s+/).every((p) => i.chave.includes(p)))
        .sort((a, b) => (a.tipo === b.tipo ? NORM(a.rotulo).indexOf(t) - NORM(b.rotulo).indexOf(t) : a.tipo === 'topico' ? -1 : 1))
        .slice(0, 30);
  selecionado = 0;
  desenharResultados(termo.trim());
}

function desenharResultados(termo) {
  const caixa = $('#resultados');
  if (!achados.length) { caixa.innerHTML = `<p class="vazio-busca">Nada encontrado para “${esc(termo)}”.</p>`; return; }
  const grifar = (txt) => {
    if (!termo) return esc(txt);
    const i = NORM(txt).indexOf(NORM(termo));
    return i < 0 ? esc(txt)
      : esc(txt.slice(0, i)) + '<mark>' + esc(txt.slice(i, i + termo.length)) + '</mark>' + esc(txt.slice(i + termo.length));
  };
  caixa.innerHTML = achados.map((a, i) => `
    <div class="res${i === selecionado ? ' sel' : ''}" data-i="${i}" style="--c:${a.topico.tema.cor}">
      <span class="ico">${a.tipo === 'topico' ? esc(a.topico.tema.icone) : '›'}</span>
      <span class="txt"><span class="t">${grifar(a.rotulo)}</span><span class="c">${esc(a.contexto)}</span></span>
      <span class="setinha">↵</span>
    </div>`).join('');
  caixa.querySelectorAll('.res').forEach((el) => {
    el.onmouseenter = () => { selecionado = +el.dataset.i; desenharResultados(termo); };
    el.onclick = () => abrirResultado(achados[+el.dataset.i]);
  });
  caixa.querySelector('.sel')?.scrollIntoView({ block: 'nearest' });
}

function abrirResultado(a) {
  if (!a) return;
  fecharBusca();
  const destino = `#/${a.topico.id}`;
  if (location.hash === destino) rotear(); else location.hash = destino;
  if (a.tipo === 'bloco') {
    const i = a.topico.blocos.findIndex((b) => b.titulo === a.rotulo);
    requestAnimationFrame(() => {
      const el = $('#bloco-' + i);
      el?.closest('details.secao')?.setAttribute('open', '');
      el?.scrollIntoView({ block: 'start' });
    });
  }
}

const abrirBusca = () => {
  $('#paleta').classList.add('aberta');
  document.body.classList.add('travado');
  const campo = $('#busca-input');
  campo.value = ''; campo.focus(); buscar('');
};
const fecharBusca = () => {
  $('#paleta').classList.remove('aberta');
  document.body.classList.remove('travado');
};

/* ═══ Roteador ═══════════════════════════════════════════════════ */
/** Abre a seção que contém a âncora, se ela estiver recolhida. */
function revelarAncora() {
  const alvo = location.hash.match(/#bloco-(\d+)$/);
  if (!alvo) return;
  const el = document.getElementById('bloco-' + alvo[1]);
  el?.closest('details.secao')?.setAttribute('open', '');
  el?.scrollIntoView({ block: 'start' });
}

function rotear() {
  const id = decodeURIComponent(location.hash.replace(/^#\/?/, '')).replace(/#bloco-\d+$/, '');
  const curso = id.startsWith('curso/') && CURSOS.find((c) => c.slug === id.slice(6));
  const topico = porId.get(id);
  if (curso) paginaCurso(curso);
  else topico ? paginaTopico(topico) : paginaInicial();
  if (location.hash.includes('#bloco-')) requestAnimationFrame(revelarAncora);
  else window.scrollTo(0, 0);
  $('#lateral').classList.remove('aberta');
  $('#veu').classList.remove('on');
}

/* ═══ Ligações gerais ════════════════════════════════════════════ */
function iniciar() {
  document.documentElement.dataset.tema = puxar('tema', 'escuro');
  montarArvore();
  rotear();
  addEventListener('hashchange', rotear);

  $('#tema-btn').onclick = () => {
    const novo = document.documentElement.dataset.tema === 'escuro' ? 'claro' : 'escuro';
    document.documentElement.dataset.tema = novo;
    guardar('tema', novo);
  };
  $('#abrir-busca').onclick = abrirBusca;
  $('#busca-input').oninput = (e) => buscar(e.target.value);
  $('#paleta').onclick = (e) => { if (e.target.id === 'paleta') fecharBusca(); };
  $('#abrir-menu').onclick = () => { $('#lateral').classList.add('aberta'); $('#veu').classList.add('on'); };
  $('#veu').onclick = () => { $('#lateral').classList.remove('aberta'); $('#veu').classList.remove('on'); };

  addEventListener('keydown', (e) => {
    const aberta = $('#paleta').classList.contains('aberta');
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); aberta ? fecharBusca() : abrirBusca(); return; }
    if (e.key === '/' && !aberta && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) { e.preventDefault(); abrirBusca(); return; }
    if (!aberta) return;
    if (e.key === 'Escape') fecharBusca();
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      selecionado = (selecionado + (e.key === 'ArrowDown' ? 1 : achados.length - 1)) % (achados.length || 1);
      desenharResultados($('#busca-input').value.trim());
    }
    if (e.key === 'Enter') abrirResultado(achados[selecionado]);
  });
}

iniciar();
