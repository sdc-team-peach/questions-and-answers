const Controller = require('../controller/index.js');

const express = require('express');
const app = express();
const PORT = 3001 || process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('client/dist'));

app.get('/loaderio-4b169e768122faf0e862d8270428a1d4', (req, res) => {
  res.send('loaderio-4b169e768122faf0e862d8270428a1d4');
})

//GET requests
app.get('/questions', Controller.getQuestions);
app.get('/questions/:question_id/answers', Controller.getAnswers);
//POST request
app.post('/questions', Controller.addQuestion);
app.post('/questions/:question_id/answers', Controller.addAnswer);
// PUT request
app.put('/questions/:question_id/helpful', Controller.updateQuestionHelpful);
app.put('/questions/:question_id/report', Controller.reportQuestion);
app.put('/answers/:answer_id/helpful', Controller.updateAnswerHelpful);
app.put('/answers/:answer_id/report', Controller.reportAnswer);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})