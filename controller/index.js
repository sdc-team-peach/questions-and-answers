const Model = require('../model/index.js');

const getQuestions = (req, res) => {
  // console.log(req.query.product_id)
  Model.getQuestions(req.query.product_id, (err, results) => {
    if (err) {
      // console.log(err)
      res.status(502).send();
    } else {
      // res.send(results.rows)
      res.status(200).send(results);
    }
  })
}

const addQuestion = (req, res) => {
  // console.log(req.body)
  Model.addQuestion(req.body, (err, result) => {
    if (err) {
      // console.log(err)
      res.status(502).send();
    } else {
      res.status(201).send();
    }
  })
}

const getAnswers = (req, res) => {
  // console.log(req.params.question_id);
  Model.getAnswers(req.params.question_id,(err, result) => {
    if (err) {
      // console.log(err)
      res.status(502).send();
    } else {
      res.status(200).send(result);
    }
  })
}

const addAnswer = (req, res) => {
  const params = { body: req.body, questionId: req.params.question_id }
  // console.log(params)
  Model.addAnswer(params, (err, result) => {
    if (err) {
      // console.log(err)
      res.status(502).send();
    } else {
      res.status(201).send();
    }
  })
}

const updateQuestionHelpful = (req, res) => {
  console.log(req.params.question_id)
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
  console.log(req.params.question_id)
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
  console.log(req.params.answer_id)
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
  console.log(req.params.answer_id)
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