/**
 * Upload de arquivo com Multer
 * Sessão 6 · Rodar: node src/09-api-e-autenticacao/04-upload-com-multer.js
 *
 * O QUE É: o middleware que entende `multipart/form-data` — o formato que o navegador usa
 *          para mandar arquivo — e grava o que chegou no disco.
 * QUANDO USAR: foto de perfil, anexo, planilha importada. Qualquer coisa que vem como arquivo.
 * QUANDO NÃO USAR: para o arquivo em si em produção séria — disco de servidor não sobrevive
 *                  a um deploy. O Multer grava; depois se manda para S3 ou parecido.
 */

// ═══ ESSENCIAL ═══

// ─── 1) src/configs/multerConfig.js ───
const multer = require('multer');
const path = require('node:path');
const os = require('node:os');
(() => {
  const config = {
    fileFilter: (req, file, cb) => {
      if (!['image/png', 'image/jpeg'].includes(file.mimetype))
        return cb(new multer.MulterError('TIPO_ERRADO'));   // vira erro no req.file
      return cb(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 },                  // 2 MB, em bytes
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, path.resolve(os.tmpdir(), 'uploads')),
      // Nome gerado: dois arquivos "foto.png" de pessoas diferentes não podem se atropelar.
      filename: (req, file, cb) => cb(null, `${Date.now()}_${Math.random().toString(36).slice(2)}${path.extname(file.originalname)}`),
    }),
  };

  console.log('tipos aceitos :', 'image/png, image/jpeg');
  console.log('tamanho máximo:', config.limits.fileSize / 1024 / 1024, 'MB');
  console.log('nome gerado   : 1787942081234_k3jd9f.png ← data + sorteio + extensão original');
  console.log('\nO nome que o usuário mandou nunca vira nome de arquivo no seu disco:');
  console.log('"../../.env" seria um nome perfeitamente válido para ele escolher.');
})();

// ─── 2) A rota de upload e o req.file ───
const express = require('express');
const multerLib = require('multer');
const fs = require('node:fs');
const caminho = require('node:path');
const sistema = require('node:os');
(async () => {
  const pasta = caminho.resolve(sistema.tmpdir(), 'uploads-exemplo-2');
  fs.mkdirSync(pasta, { recursive: true });

  const upload = multerLib({ dest: pasta });
  const app = express();

  // 'foto' é o nome do campo no formulário — tem que bater com o que o cliente manda.
  app.post('/fotos', upload.single('foto'), (req, res) => {
    const { originalname, filename, size, mimetype } = req.file;
    res.status(201).json({ originalname, filename, size, mimetype });
  });

  const servidor = app.listen(0, async () => {
    const formulario = new FormData();
    formulario.append('foto', new Blob([Buffer.alloc(1234)], { type: 'image/png' }), 'ana-perfil.png');

    const r = await fetch(`http://localhost:${servidor.address().port}/fotos`, {
      method: 'POST', body: formulario,
    });
    const corpo = await r.json();
    console.log('status          :', r.status);
    console.log('originalname    :', corpo.originalname, '← o nome do computador dele');
    console.log('mimetype        :', corpo.mimetype);
    console.log('size            :', corpo.size, 'bytes');
    console.log('gravado no disco:', fs.existsSync(caminho.resolve(pasta, corpo.filename)));

    fs.rmSync(pasta, { recursive: true, force: true });
    servidor.close();
  });
})();

// ─── 3) Recusar o que não deve entrar ───
const expresso = require('express');
const uploadLib = require('multer');
const so = require('node:os');
const montar = require('node:path');
const disco = require('node:fs');
(async () => {
  const pasta = montar.resolve(so.tmpdir(), 'uploads-exemplo-3');
  disco.mkdirSync(pasta, { recursive: true });

  const upload = uploadLib({
    dest: pasta,
    limits: { fileSize: 1024 },                            // 1 KB, para caber no exemplo
    fileFilter: (req, file, cb) =>
      cb(null, ['image/png', 'image/jpeg'].includes(file.mimetype)),   // false = recusa calado
  });

  const app = expresso();
  app.post('/fotos', upload.single('foto'), (req, res) => {
    if (!req.file) return res.status(400).json({ errors: ['Envie uma imagem PNG ou JPG.'] });
    return res.status(201).json({ aceito: req.file.mimetype });
  });
  // O erro do Multer (tamanho, por exemplo) chega aqui, no middleware de erro de 4 argumentos.
  app.use((erro, req, res, proximo) => res.status(400).json({ errors: [erro.code || erro.message] }));

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}/fotos`;
    const enviar = async (bytes, tipo, nome) => {
      const f = new FormData();
      f.append('foto', new Blob([Buffer.alloc(bytes)], { type: tipo }), nome);
      const r = await fetch(url, { method: 'POST', body: f });
      return `${r.status} ${JSON.stringify(await r.json()).slice(0, 60)}`;
    };

    console.log('png de 500 bytes:', await enviar(500, 'image/png', 'ok.png'));
    console.log('pdf de 500 bytes:', await enviar(500, 'application/pdf', 'contrato.pdf'));
    console.log('png de 5 KB     :', await enviar(5000, 'image/png', 'grande.png'));

    disco.rmSync(pasta, { recursive: true, force: true });
    servidor.close();
  });
})();

// ═══ NA PRÁTICA ═══

// ─── 4) Gravar no disco é metade: falta a URL ───
const expr = require('express');
const arquivos = require('node:fs');
const pth = require('node:path');
const osLib = require('node:os');
(async () => {
  const pasta = pth.resolve(osLib.tmpdir(), 'uploads-exemplo-4');
  arquivos.mkdirSync(pasta, { recursive: true });
  arquivos.writeFileSync(pth.resolve(pasta, '1787942081_k3jd.png'), 'bytes de uma imagem');

  const app = expr();
  app.use('/uploads', expr.static(pasta));      // a pasta vira endereço público

  // O banco guarda só o nome do arquivo; a URL é montada na hora de responder.
  const linha = { id: 1, filename: '1787942081_k3jd.png', aluno_id: 3 };
  app.get('/fotos/1', (req, res) => res.json({
    id: linha.id,
    url: `${process.env.APP_URL || 'http://localhost:3001'}/uploads/${linha.filename}`,
  }));

  const servidor = app.listen(0, async () => {
    const url = `http://localhost:${servidor.address().port}`;
    console.log('GET /fotos/1 →', JSON.stringify(await fetch(url + '/fotos/1').then((r) => r.json())));
    const arquivo = await fetch(`${url}/uploads/${linha.filename}`);
    console.log('a imagem abre?', arquivo.status, await arquivo.text());
    console.log('\nGuardar a URL inteira no banco quebra no dia em que o domínio mudar.');
    console.log('Guarde o nome; monte a URL com APP_URL na resposta.');

    arquivos.rmSync(pasta, { recursive: true, force: true });
    servidor.close();
  });
})();

// ─── 5) Apagou o registro, apague o arquivo ───
const fsPromessas = require('node:fs/promises');
const caminhos = require('node:path');
const os5 = require('node:os');
(async () => {
  const pasta = caminhos.resolve(os5.tmpdir(), 'uploads-exemplo-5');
  await fsPromessas.mkdir(pasta, { recursive: true });
  await fsPromessas.writeFile(caminhos.resolve(pasta, 'foto-antiga.png'), 'bytes');

  let banco = [{ id: 1, filename: 'foto-antiga.png' }];

  async function destroy(id) {
    const foto = banco.find((f) => f.id === id);
    if (!foto) return { status: 404, corpo: { errors: ['Foto não existe.'] } };

    banco = banco.filter((f) => f.id !== id);
    // O arquivo pode já ter sumido (deploy, limpeza manual): isso não é motivo de erro 500.
    await fsPromessas.unlink(caminhos.resolve(pasta, foto.filename)).catch(() => {});
    return { status: 200, corpo: foto };
  }

  console.log('antes  :', await fsPromessas.readdir(pasta));
  console.log('DELETE :', JSON.stringify(await destroy(1)));
  console.log('depois :', await fsPromessas.readdir(pasta), '← sem arquivo órfão ocupando disco');
  console.log('de novo:', JSON.stringify(await destroy(1)));

  await fsPromessas.rm(pasta, { recursive: true, force: true });
})();

// ─── 6) A validação falhou DEPOIS de o arquivo já estar no disco ───
const web = require('express');
const envio = require('multer');
const fsSync = require('node:fs');
const path6 = require('node:path');
const os6 = require('node:os');
(async () => {
  const pasta = path6.resolve(os6.tmpdir(), 'uploads-exemplo-6');
  fsSync.mkdirSync(pasta, { recursive: true });
  const app = web();
  const upload = envio({ dest: pasta });

  app.post('/fotos', upload.single('foto'), (req, res) => {
    if (!req.body.aluno_id) {
      // O Multer gravou antes de a rota rodar. Sem esta linha, sobra lixo no disco.
      fsSync.unlinkSync(req.file.path);
      return res.status(400).json({ errors: ['Informe o aluno_id.'] });
    }
    return res.status(201).json({ filename: req.file.filename });
  });

  const servidor = app.listen(0, async () => {
    const f = new FormData();
    f.append('foto', new Blob([Buffer.alloc(100)], { type: 'image/png' }), 'sem-dono.png');

    const r = await fetch(`http://localhost:${servidor.address().port}/fotos`, { method: 'POST', body: f });
    console.log('resposta        :', r.status, JSON.stringify(await r.json()));
    console.log('sobrou no disco :', fsSync.readdirSync(pasta).length, 'arquivo(s)');
    console.log('\nO Multer roda ANTES da sua rota: quando a validação falha, o arquivo já');
    console.log('existe. Todo caminho de erro depois do upload tem que apagar o arquivo.');

    fsSync.rmSync(pasta, { recursive: true, force: true });
    servidor.close();
  });
})();

// ═══ PEGADINHAS ═══

// ─── 7) Em multipart, req.body só existe depois do Multer ───
const framework = require('express');
const arquivosLib = require('multer');
const os7 = require('node:os');
const path7 = require('node:path');
const sistemaDeArquivos = require('node:fs');
(async () => {
  const pasta = path7.resolve(os7.tmpdir(), 'uploads-exemplo-7');
  sistemaDeArquivos.mkdirSync(pasta, { recursive: true });
  const app = framework();
  app.use(framework.json());                        // não entende multipart, e tudo bem
  const upload = arquivosLib({ dest: pasta });

  app.post('/antes', (req, res, proximo) => {
    console.log('antes do multer :', JSON.stringify(req.body), '← o corpo ainda nem foi lido');
    proximo();
  }, upload.single('foto'), (req, res) => {
    console.log('depois do multer:', JSON.stringify(req.body), '← os campos de texto chegaram');
    res.json({ ok: true });
  });

  const servidor = app.listen(0, async () => {
    const f = new FormData();
    f.append('aluno_id', '3');
    f.append('foto', new Blob([Buffer.alloc(50)], { type: 'image/png' }), 'ana.png');
    await fetch(`http://localhost:${servidor.address().port}/antes`, { method: 'POST', body: f });

    console.log('\nQuem quiser ler `aluno_id` tem que vir DEPOIS do upload.single().');
    console.log('E `express.json()` não ajuda em nada aqui: o formato é outro.');
    sistemaDeArquivos.rmSync(pasta, { recursive: true, force: true });
    servidor.close();
  });
})();

// ─── Resumo ───
// 1. `upload.single('foto')` põe o arquivo em `req.file` e os campos de texto em `req.body`.
// 2. Nome de arquivo é sempre gerado por você — o do usuário é texto de entrada, não caminho.
// 3. `fileFilter` e `limits` recusam tipo e tamanho antes de o disco encher.
// 4. Guarde o nome no banco e monte a URL com APP_URL; sirva a pasta com `express.static`.
// 5. Apagou o registro, apague o arquivo — e ignore o arquivo que já não estava lá.
// 6. Falhou depois do upload? Apague o que o Multer gravou, senão sobra órfão para sempre.
