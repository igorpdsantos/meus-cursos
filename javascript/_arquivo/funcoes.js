/*
* Funções *
Funções são blocos de código reutilizáveis que realizam uma tarefa específica.
* Quando usar? *
Funções são usadas para organizar o código, evitar repetição e melhorar a legibilidade.
Elas podem receber parâmetros, executar operações e retornar valores.
*/
function somar() {
    console.log('Arguments:', arguments);
    let total = 0;

    for(argument of arguments) {
        total += argument;
    }
    console.log('Total:', total);
    
    [primeiroArgumento, ...args] = arguments;
    console.log('Primeiro argumento:', primeiroArgumento);
    console.log('Restante dos argumentos:', args);

    return total;
}

somar(1, 2, 3);


/* 
* Funções geradoras *
As funções geradoras são funções que podem ser pausadas e retomadas, 
permitindo a produção de uma sequência de valores ao longo do tempo. 
Elas são definidas usando a sintaxe `function*` e utilizam a palavra-chave `yield` para produzir valores.
* Quando usar? *
Comumente, as funções geradoras são usadas quando você precisa gerar uma sequência de valores sob demanda,
em vez de calcular todos os valores de uma vez. Isso é útil em situações como:
- Processamento de grandes conjuntos de dados.
- Implementação de iteradores personalizados.
- Fluxos de dados assíncronos, como leitura de arquivos ou streams.
*/
function* geradora1() {
    yield 'Valor 1';
    yield 'Valor 2';
    yield 'Valor 3';
}

const g1 = geradora1();
console.log(g1.next());
console.log(g1.next());
console.log(g1.next());
console.log(g1.next());

function* geradora2() {
    let i = 1;

    while(i <= 5) {
        yield i;
        i++;
    }
}

const g2 = geradora2();
for(let valor of g2) {
    console.log(valor);
}



/*
* Factory Functions e Constructor Functions *
Factory Functions são funções que retornam objetos, permitindo a criação de múltiplas instâncias de objetos com propriedades e métodos semelhantes.
Constructor Functions são funções especiais usadas para criar objetos usando a palavra-chave `new`. Elas definem a estrutura e o comportamento dos objetos criados.
* Quando usar? *
Use Factory Functions quando quiser criar objetos de forma simples e flexível, sem a necessidade de usar `new`.
Use Constructor Functions quando quiser criar objetos com uma estrutura definida e utilizar herança prototípica.
*/

function criarPessoa(nome, sobrenome) {
    return {
        nome,
        sobrenome,
        nomeCompleto() {
            return `${this.nome} ${this.sobrenome}`;
        }
    };
}

const pessoa1 = criarPessoa('João', 'Silva');
console.log(pessoa1.nomeCompleto());

function Pessoa(nome, sobrenome) {
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.nomeCompleto = function() {
        return `${this.nome} ${this.sobrenome}`;
    };
}

const pessoa2 = new Pessoa('Maria', 'Oliveira');
console.log(pessoa2.nomeCompleto());


/*
* Funções de Callback *
Funções de callback são funções passadas como argumentos para outras funções, permitindo que sejam executadas em momentos específicos.
* Quando usar? *
Use funções de callback quando precisar executar uma função após a conclusão de uma operação assíncrona, como requisições HTTP, eventos ou temporizadores.
*/
function saudacao(nome) {
    console.log(`Olá, ${nome}!`);
}

function processarUsuario(callback) {
    const nome = 'Carlos';
    callback(nome);
}

processarUsuario(saudacao);


/* 
* Escopo Léxico, Closures e IIFE *
Escopo léxico refere-se à forma como o JavaScript determina o escopo de variáveis com base na estrutura do código.
Closures são funções que "lembram" do escopo em que foram criadas, permitindo acessar variáveis externas mesmo após a função externa ter sido executada.
IIFE (Immediately Invoked Function Expression) é uma função que é definida e imediatamente invocada, criando um escopo isolado.
* Quando usar? *
Use closures para criar funções com estado privado ou para manter referências a variáveis externas.
Use IIFE para encapsular código e evitar poluição do escopo global.
*/

function criarContador() {
    let contador = 0;

    return function() {
        contador++;
        return contador;
    };
}

const contador1 = criarContador();
console.log(contador1()); // 1
console.log(contador1()); // 2

const contador2 = criarContador();
console.log(contador2()); // 1
console.log(contador2()); // 2

(function() {
    const mensagem = 'Esta é uma IIFE!';
    console.log(mensagem);
})();