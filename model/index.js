const { Pool } = require('pg')

const pool = new Pool({
  user: 'bulganerdenebaatar',
  host: 'localhost',
  database: 'postgres',
  password: '',
})

// GET /qa/questions
// const getQuestions = (productId, callback) => {
//   // console.log(productId);
//   pool.query(`SELECT * FROM sdc.questions where product_id=${productId}`, (err, res) => {
//     if (err) {
//       callback(err)
//     } else {
//       callback(null, res)
//     }
//   })
// }
const getQuestions = (productId, callback) => {
  // console.log(productId);
  // SELECT row_to_json(results) from (SELECT * from sdc.questions where sdc.questions.id = 34) as results
  pool.query(`
  select
    json_agg(
            json_build_object(
                'question_id', q.id,
                'question_body', q.body,
                'question_date', q.date_written,
                'asker_name',q.asker_name,
                'question_helpfulness', q.helpful, 'reported', q.reported,
                'answers', tanswers
            )
    )
from sdc.questions q
left join (
    select
        question_id,
        json_object_agg(a.id,
            json_build_object(
                'id', a.id,
                'body', a.body,
                'date', a.date_written,
                'answerer_name', a.answerer_name,
                'helpfulness', a.helpful,
                'photos', t_answer_photos
                )
            ) tanswers
    from
        sdc.answers a
        left join (
            select
                answer_id,
                json_agg(
                    json_build_object(
                        'id', ap.id,
                        'url', ap.url
                    )
                ) t_answer_photos
            from sdc.answers_photos ap
            group by answer_id
        ) ap on a.id = ap.answer_id
    group by question_id
) a on q.id = a.question_id
WHERE q.product_id = ${productId};
 `,
 (err, res) => {
    if (err) {
      callback(err)
    } else {
      const results = res.rows[0].json_agg
      callback(null, {"product_id": productId, results})
    }
  })
}
// POST /qa/questions
const addQuestion = (params, callback) => {
  const { product_id, body, name, email} = params;
  const date_written = new Date();
  pool.query('INSERT INTO sdc.questions (product_id, body, asker_name, asker_email, date_written, reported, helpful) VALUES ($1 , $2 , $3 , $4, $5, $6, $7)', [ product_id, body, name, email, date_written, 0, 0 ], (err, res) => {
    if (err) {
      callback(err)
    } else {
      callback(null, res)
    }
  })
}

// GET /qa/questions/:question_id/answers
const getAnswers = (questionId, callback) => {
  pool.query(`SELECT * FROM sdc.answers where question_id=${questionId}`, (err, res) => {
    if (err) {
      callback(err)
    } else {
      callback(null, res)
    }
  })
}
// POST /qa/questions/:question_id/answers
const addAnswer = (params, callback) => {
  console.log('params model------', params)
  const { body, name, email, photos } = params.body
  const questionId = params.questionId
  const date_written = new Date()
  pool.query(`INSERT INTO sdc.answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [ questionId, body, date_written, name, email, 0, 0 ], (err, res) => {
    if (err) {
      callback(err)
    } else {
      callback(null, res)
    }
  })
}

module.exports = { getQuestions, getAnswers, addQuestion, addAnswer }