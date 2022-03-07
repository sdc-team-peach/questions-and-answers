const Controller = require('../controller/index.js');

const express = require('express');
const app = express();
const PORT = 3001 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
// app.use(express.json({ extended: true }));
app.use(express.static('client/dist'));

app.get('/questions', Controller.getQuestions);
app.get('/questions/:question_id/answers', Controller.getAnswers);
app.post('/questions', Controller.addQuestion);
app.post('/questions/:question_id/answers', Controller.addAnswer);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})