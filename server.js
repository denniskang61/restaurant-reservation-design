/**
 * 
 */

// set up ==============================================
var express=require('express');
var app=express();      // create app with express
var mongoose=require('mongoose');   // mongoose for mongoDB
var morgan=require('morgan');  // log requests to the console
var bodyParser=require('body-parser');  // pull information from HTML POST
/*
var methodOverride=require('method-override'); // simulate DELETE and PUT
*/


// configuration ================================================

app.use(express.static(__dirname+'/public')); // set the static files location
app.use(morgan('dev'));   // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));  // parse application with x-www-form-urlencoded
app.use(bodyParser.json());  // parse application with json
app.use(bodyParser.json({type:'application/vnd.api+json'})); // parse application/vnd.api+json as json

/*
var database=require('./config/database');*/
mongoose.connect('mongodb://localhost:27017/mongo');



// routes =====================================
require('./app/routes')(app);


// listen to certain port ==============================
app.listen(8080);
console.log("app listening on port 8080");


