const fs = require('fs');
const csv = require('csv');

fs.createReadStream('/Users/bulganerdenebaatar/Downloads/answers.csv')
  .pipe(csv.parse({columns: true}))
  .pipe(csv.transform((input) => {
    return Object.assign({}, input, {
        date_written: new Date(parseInt(input['date_written'])).toUTCString()
    });
  }))
  .pipe(csv.stringify({header: true}))
  .pipe(fs.createWriteStream('./answers.csv'))
  .on('finish', () => {
    console.log('Done 🍻 ');
  });

  // date_written: new Date(input['date_written']).toLocaleDateString("en-US")