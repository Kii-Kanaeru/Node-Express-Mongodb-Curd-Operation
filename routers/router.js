let express = require('express');
let empmodel = require('../model/model')
let emprouter = express();


emprouter.get('/', (req, res)=>{
    empmodel.find({})
    .then((x)=>{
        res.render('index', {x})
    })
    .catch((y)=>{
        console.log(y)
    })
    
})
emprouter.get('/add-employ', (req, res)=>{
   res.render('add-file')
})
emprouter.post('/add-employ', (req, res)=>{
    let data = {
        Name : req.body.name,
        Designation :req.body.designation,
        Salary :req.body.salary
    }
    empmodel.create(data)
    .then((x)=>{
        req.flash('sucess', 'Your Data has created on Database')
        res.redirect('/')
    })
    .catch((y)=>{
        req.flash('err', 'Your Data has not created on Database')
        res.redirect('/')
      
    })
})

emprouter.get('/search', (req, res)=>{
    res.render('search-file', {x:''})
})

emprouter.get('/employee', (req, res)=>{
    let readquery = req.query.name
    console.log(readquery)
    empmodel.findOne({Name:readquery})
    .then((x)=>{
        res.render('search-file', {x})
        console.log(x)
    })
    
})

emprouter.get('/edit/:id', (req, res)=>{
    let readquery = req.params.id;
   
    empmodel.findOne({Name:readquery})
    .then((x)=>{
        res.render('update-file', {x})
    })
   
})

emprouter.put('/edit/:id', (req, res)=>{
    let readquery = req.params.id;
    empmodel.updateOne({Name:readquery}, {
        $set:{
            Name:req.body.name,
            Designation:req.body.designation,
            Salary:req.body.salary,
        }
    })
    .then((x)=>{
        req.flash('sucess', 'Your Data has update')
        res.redirect('/')
    })
    .catch((y)=>{
        console.log(y)
    })
})
emprouter.delete('/delete/:id', (req, res)=>{
    empmodel.deleteOne({Name:req.params.id})
    .then((x)=>{
        req.flash('sucess', 'Your Data has delete')
        res.redirect('/')
    })
    .catch((y)=>{
        console.log(y)
    })
})




module.exports = emprouter;