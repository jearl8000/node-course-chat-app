var moment = require('moment');

var date = moment();

date.add(5, 'hour');
// challenge: output in format like '10:35 am'
console.log(date.format('h:mm a'));