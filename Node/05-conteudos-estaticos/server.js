//Agora instalamos o nodemon para que o servidor reinicie automaticamente quando houver alterações no código. Para isso, vamos instalar o nodemon como uma dependência de desenvolvimento:
//npm install --save-dev nodemon

//Em seguida, vamos adicionar um script no package.json para iniciar o servidor com o nodemon. Abra o arquivo package.json e adicione a seguinte linha dentro do objeto "scripts":
//"start": "nodemon server.js"

//Agora, podemos iniciar o servidor com o comando npm start. O nodemon irá monitorar as alterações no código e reiniciar o servidor automaticamente quando necessário.


const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes.js');
const path = require('path');

app.use(routes);

//Essa função é responsável por fazer o parse do corpo da requisição, permitindo que possamos acessar os dados enviados pelo cliente através do objeto req.body. O parâmetro extended: true permite que possamos enviar objetos complexos no corpo da requisição, como arrays e objetos aninhados.
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public'))); // Serve arquivos estáticos da pasta 'public'

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});