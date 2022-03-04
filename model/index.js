const { Pool } = require('pg')

const pool = new Pool({
  user: 'bulganerdenebaatar',
  host: 'localhost',
  database: 'postgres',
  password: '',
  // port: 3001,
})
const getQuestions = (callback) => {
  pool.query('SELECT * FROM sdc.questions limit 10', (err, res) => {
    if (err) {
      callback(err)
    } else {
      callback(null, res)
    }
  })
}

module.exports = { getQuestions }