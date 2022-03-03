const fs = require('fs');
const csv = require('csv-parser');

fs.createReadStream('/Users/bulganerdenebaatar/Downloads/questions.csv')
.pipe(csv())
.on('data', function(data){
    try {
        console.log("Name is: "+data.date_written);
        // console.log("Age is: "+data.AGE);

        //perform the operation
    }
    catch(err) {
        //error handler
    }
})
.on('end',function(){
    //some final operation
});