/*
* Trabalhando com Arrays *
Arrays são estruturas de dados que armazenam múltiplos valores em uma única variável.
Eles são úteis para organizar e manipular conjuntos de dados.
* Quando usar? *
Use arrays quando precisar armazenar uma coleção de elementos, como listas de itens, números ou objetos.
Eles permitem iteração, filtragem, mapeamento e outras operações úteis para manipulação de dados.
*/

let nomes = ['João', 'Maria', 'José', 'Ana', 'Carlos'];
console.log(nomes[0]); // Acessando o primeiro elemento do array
console.log(nomes.length); // Obtendo o tamanho do array

nomes.push('Ana'); // Adicionando um novo elemento ao final do array
console.log(nomes);

nomes.pop(); // Removendo o último elemento do array
console.log(nomes);

nomes.unshift('Carlos'); // Adicionando um novo elemento no início do array
console.log(nomes);

nomes.shift(); // Removendo o primeiro elemento do array
console.log(nomes);

delete nomes[2]; // Removendo o elemento na posição 2 do array
console.log(nomes);