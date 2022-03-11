const Model = require('../model/index.js');

const getQuestions = (req, res) => {
  console.log('running server on get request');
  Model.getQuestions(req.query.product_id, (err, results) => {
    if (err) {
      res.status(502).send();
    } else {
      res.status(200).send(results);
    }
  })
}

const addQuestion = (req, res) => {
  Model.addQuestion(req.body, (err, result) => {
    if (err) {
      res.status(502).send();
    } else {
      res.status(201).send();
    }
  })
}

const getAnswers = (req, res) => {
  Model.getAnswers(req.params.question_id,(err, result) => {
    if (err) {
      res.status(502).send();
    } else {
      res.status(200).send(result);
    }
  })
}

const addAnswer = (req, res) => {
  const params = { body: req.body, questionId: req.params.question_id }
  Model.addAnswer(params, (err, result) => {
    if (err) {
      res.status(502).send();
    } else {
      res.status(201).send();
    }
  })
}

const updateQuestionHelpful = (req, res) => {
  const qId = req.params.question_id
  Model.updateQuestionHelpful(qId, (err, result) => {
    if (err) {
      res.status(502).send();
    } else {
      res.status(204).send();
    }
  })
}

const reportQuestion = (req, res) => {
  const questId = req.params.question_id
  Model.reportQuestion(questId, (err, result) => {
    if (err) {
      res.status(502).send();
    } else {
      res.status(204).send();
    }
  })
}

const updateAnswerHelpful = (req, res) => {
  const ansId = req.params.answer_id
  Model.updateAnswerHelpful(ansId, (err, result) => {
    if (err) {
      res.status(502).send();
    } else {
      res.status(204).send();
    }
  })
}

const reportAnswer = (req, res) => {
  const ansId = req.params.answer_id
  Model.reportAnswer(ansId, (err, result) => {
    if (err) {
      res.status(502).send();
    } else {
      res.status(204).send();
    }
  })
}

module.exports = { getQuestions ,getAnswers, addQuestion, addAnswer, updateQuestionHelpful, reportQuestion, updateAnswerHelpful, reportAnswer }