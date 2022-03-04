const Controller = require('../controller/index.js');

const express = require('express');
const app = express();
const PORT = 3001 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json({ extended: true }));
app.use(express.static('client/dist'));

app.get('/questions', Controller.getQuestions );

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})