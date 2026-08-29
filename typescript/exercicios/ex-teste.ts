type Alternativa = {
  id: number;
  texto: string;
  votos: number;
};

type Questionario = {
  id: number;
  pergunta: string;
  alternativas: Alternativa[];
};

const questionario_mult_esc: Questionario[] = [
  {
    id: 1,
    pergunta: "Qual é a sua linguagem de programação favorita?",
    alternativas: [
      { id: 1, texto: "JavaScript", votos: 0 },
      { id: 2, texto: "Python", votos: 0 },
      { id: 3, texto: "Java", votos: 0 },
      { id: 4, texto: "C#", votos: 0 }
    ]
  },
  {
    id: 2,
    pergunta: "Qual é a sua cor favorita?",
    alternativas: [
      { id: 1, texto: "Vermelho", votos: 0 },
      { id: 2, texto: "Azul", votos: 0 },
      { id: 3, texto: "Verde", votos: 0 },
      { id: 4, texto: "Amarelo", votos: 0 }
    ]
  }
]

class QuestionarioService {
  constructor(private questionario: Questionario[]) {}

  votar(perguntaId: number, alternativaId: number): void {
    const pergunta = this.questionario.find(q => q.id === perguntaId);
    if (pergunta) {
      const alt = pergunta.alternativas.find(a => a.id === alternativaId);
      if (alt) {
        alt.votos++;
      }
    }
  }

  verResultados(): void {
    console.log("Resultados do questionário");
    console.log('----------------');
    this.questionario.forEach((i, index, list)=>{
      console.log(`Pergunta ${i.id}: ${i.pergunta}:`);
      i.alternativas.forEach(j => {
        console.log(`${j.id} - ${j.texto}: ${j.votos} votos`);
      })
      if(index +1 < list.length) console.log('----------------');
    })
  }
}

const questionarioService = new QuestionarioService(questionario_mult_esc);
questionarioService.votar(1, 1);
questionarioService.votar(1, 1);
questionarioService.votar(1, 1);
questionarioService.votar(1, 1);
questionarioService.verResultados();