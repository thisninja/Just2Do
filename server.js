var express  = require('express');
var app      = express();                 
var mongoose = require('mongoose');       
var port     = process.env.PORT || 8080;       
var database = require('./config/database');      
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var connection = mongoose.connect(database.url);  
app.use(express.static(__dirname));  
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
require('./modules/routes.js')(app, mongoose, connection);

app.listen(port);
console.log("App listening on port " + port);
