//Agora instalamos o nodemon para que o servidor reinicie automaticamente quando houver alterações no código. Para isso, vamos instalar o nodemon como uma dependência de desenvolvimento:
//npm install --save-dev nodemon

//Em seguida, vamos adicionar um script no package.json para iniciar o servidor com o nodemon. Abra o arquivo package.json e adicione a seguinte linha dentro do objeto "scripts":
//"start": "nodemon server.js"

//Agora, podemos iniciar o servidor com o comando npm start. O nodemon irá monitorar as alterações no código e reiniciar o servidor automaticamente quando necessário.


const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/contato', (req, res) => {
    res.send('Obrigado por entrar em contato conosco!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});