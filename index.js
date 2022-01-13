let express = require('express');
let app = express();

let methodoverwride = require('method-override')
let dotenv= require('dotenv')

let mongoose  = require('mongoose');
let myrouter= require('./routers/router')
let bodyParser = require('body-parser')

let session = require('express-session');
let flash = require('connect-flash')

dotenv.config({path: './config.env'})
mongoose.connect(process.env.mongodburl);
app.set('view engine', 'ejs')


app.use(methodoverwride('_method'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

// session middleweare
app.use(session({
   secret: 'nodejs',
   resave:true,
   saveUninitialized:true
}))
//flash middleweare
app.use(flash())

//globaly variable set for operation (like sucess , error) message
app.use((req, res, next)=>{
 res.locals.sucess = req.flash('sucess'),
 res.locals.err = req.flash('err')
 next()
})



app.use(myrouter)
app.listen(process.env.PORT, ()=>{
    console.log(process.env.PORT, "Port Working");
} )