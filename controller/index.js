const Model = require('../model/index.js');

const getQuestions = (req, res) => {
  // console.log(req.query.product_id)
  Model.getQuestions(req.query.product_id, (err, results) => {
    if (err) {
      // console.log(err)
      res.status(502).send()
    } else {
      // res.send(results.rows)
      res.send(results)
    }
  })
}

const addQuestion = (req, res) => {
  // console.log(req.body)
  Model.addQuestion(req.body, (err, result) => {
    if (err) {
      // console.log(err)
      res.status(502).send()
    } else {
      res.status(201).send()
    }
  })
}

const getAnswers = (req, res) => {
  // console.log(req.params.question_id);
  Model.getAnswers(req.params.question_id,(err, result) => {
    if (err) {
      // console.log(err)
      res.status(502).send()
    } else {
      res.send(result)
    }
  })
}

const addAnswer = (req, res) => {
  const params = { body: req.body, questionId: req.params.question_id }
  // console.log(params)
  Model.addAnswer(params, (err, result) => {
    if (err) {
      console.log(err)
      res.status(502).send()
    } else {
      res.status(201).send()
    }
  })
}

module.exports = { getQuestions ,getAnswers, addQuestion, addAnswer }