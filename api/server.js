var express 	= require('express');
var models	 	= require('./models');
var bodyParser 	= require("body-parser");
var app 		= express();
var port 		= 8080;

//App Config
app.use(express.static(__dirname + './../app/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//middleware
var authentication = require("./middleware/auth");

//Routes
var auth_routes = require('./routes/auth');
var user_routes = require('./routes/users');

app.use('/api/auth',auth_routes);
app.use('/api/users',user_routes);

//start server and database
models.sequelize.sync().then(function(){
	app.listen(port,function(){
		console.log('Listening on http://localhost:%s',port);
		console.log('Stop Server With CTRL + C');
	});
});