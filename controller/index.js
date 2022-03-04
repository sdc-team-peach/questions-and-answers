const Model = require('../model/index.js');

const getQuestions = (req, res) => {
  Model.getQuestions((err, result) => {
    if (err) {
      console.log(err)
      res.status(502).send()
    } else {
      res.send(result)
    }
  })
}

module.exports = { getQuestions }