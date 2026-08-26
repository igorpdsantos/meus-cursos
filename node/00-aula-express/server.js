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