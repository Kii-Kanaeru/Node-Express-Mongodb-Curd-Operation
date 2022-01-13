let mongoose = require('mongoose');

let myschema = mongoose.Schema({
    Name : String,
    Designation : String,
    Salary : Number
})

let mymodel = mongoose.model('table', myschema)

module.exports = mymodel;