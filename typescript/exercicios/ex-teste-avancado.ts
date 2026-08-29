/**
 * Questionário de múltipla escolha — versão avançada
 * Exercício · Rodar: node --experimental-transform-types exercicios/ex-teste-avancado.ts
 *
 * O QUE É: a mesma enquete, com os dados imutáveis e os ids validados pelo compilador.
 * QUANDO USAR: quando a lista de perguntas é fixa e errar um id não pode virar bug silencioso.
 * QUANDO NÃO USAR: se as perguntas vêm do banco em tempo de execução — aí não há literal para o `tsc` ler.
 */

// ─── 1) Os tipos: tudo readonly, porque pergunta não muda; voto é que muda ───

type Alternativa = { readonly id: number; readonly texto: string };
type Pergunta = {
  readonly id: number;
  readonly texto: string;
  readonly alternativas: readonly Alternativa[];
};

// `satisfies` confere o formato SEM apagar os literais: o `as const` mantém
// `id: 1` como o número 1, não como `number`. É disso que vive a checagem do item 2.
const PERGUNTAS = [
  {
    id: 1,
    texto: "Qual é a sua linguagem de programação favorita?",
    alternativas: [
      { id: 11, texto: "JavaScript" },
      { id: 12, texto: "Python" },
      { id: 13, texto: "Java" },
      { id: 14, texto: "C#" },
    ],
  },
  {
    id: 2,
    texto: "Qual é a sua cor favorita?",
    alternativas: [
      { id: 21, texto: "Vermelho" },
      { id: 22, texto: "Azul" },
      { id: 23, texto: "Verde" },
    ],
  },
] as const satisfies readonly Pergunta[];

// ─── 2) Result: erro é valor de retorno, não `if` mudo lá dentro ───

type Result<T, E> = { readonly ok: true; readonly valor: T } | { readonly ok: false; readonly erro: E };

type ErroVoto = "pergunta-inexistente" | "alternativa-inexistente";

// ─── 3) A enquete ───

class Enquete<const Ps extends readonly Pergunta[]> {
  // `#votos` é privado de verdade (JS), não só na hora de compilar como o `private`.
  readonly #votos = new Map<string, number>();

  constructor(private readonly perguntas: Ps) {}

  // A mágica: `Extract<Ps[number], { id: P }>` acha a pergunta P dentro da tupla e
  // pega SÓ os ids das alternativas dela. Passar 21 na pergunta 1 nem compila.
  votar<const P extends Ps[number]["id"]>(
    pergunta: P,
    alternativa: Extract<Ps[number], { id: P }>["alternativas"][number]["id"],
  ): Result<number, ErroVoto> {
    const p = this.perguntas.find((q) => q.id === pergunta);
    if (!p) return { ok: false, erro: "pergunta-inexistente" };
    if (!p.alternativas.some((a) => a.id === alternativa)) {
      return { ok: false, erro: "alternativa-inexistente" };
    }
    const chave = `${pergunta}:${alternativa}`;
    const total = (this.#votos.get(chave) ?? 0) + 1;
    this.#votos.set(chave, total);
    return { ok: true, valor: total };
  }

  // Devolve dado, não texto: quem chama decide se imprime, salva ou vira JSON.
  apurar() {
    const pct = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });
    return this.perguntas.map((p) => {
      const contagem = p.alternativas.map((a) => ({
        ...a,
        votos: this.#votos.get(`${p.id}:${a.id}`) ?? 0,
      }));
      const total = contagem.reduce((soma, a) => soma + a.votos, 0);
      const ranking = contagem
        .map((a) => ({ ...a, fatia: total === 0 ? "—" : pct.format(a.votos / total) }))
        .sort((a, b) => b.votos - a.votos);
      return { pergunta: p.texto, total, ranking, vencedora: total === 0 ? null : ranking[0]! };
    });
  }
}

// ─── 4) Usando ───

const enquete = new Enquete(PERGUNTAS);

for (const [p, a] of [[1, 11], [1, 11], [1, 12], [2, 22], [2, 22], [2, 23]] as const) {
  enquete.votar(p, a);
}

// @ts-expect-error Argument of type '21' is not assignable to parameter of type '11 | 12 | 13 | 14'.
console.log("id de outra pergunta:", enquete.votar(1, 21));

for (const r of enquete.apurar()) {
  console.log(`\n${r.pergunta}  (${r.total} votos)`);
  for (const a of r.ranking) console.log(`  ${a.texto.padEnd(12)} ${String(a.votos).padStart(2)}  ${a.fatia}`);
  console.log(`  → vencedora: ${r.vencedora?.texto ?? "ninguém votou"}`);
}

// ─── Resumo ───
// `as const satisfies T` valida o formato e ainda guarda os literais para tipos derivados.
// `Extract<U, { id: P }>` amarra dois argumentos entre si: o segundo depende do primeiro.
// Result<T, E> obriga quem chama a tratar a falha; `void` deixa o erro sumir sem ninguém ver.
// Dados imutáveis + placar num Map separado: o que não muda não pode ser mudado por engano.
