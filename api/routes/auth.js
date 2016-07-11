var models 	= require('./../models');
var bcrypt	= require('bcrypt');
var jwt		= require('jsonwebtoken');
var router 	= require('express').Router();

//POST register a new user (accessed at POST http://localhost:8080/api/auth/register)
router.post('/register',function(req,res){
	console.log('Registration Endpoint');
	var __user = req.body;

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(__user.password, salt, function(err, hash) {
	    	if(!err){
	    		__user.password = hash;
		        	models.Users.create(__user)
		        	.then(function(user){
		        	user.password ='';
		        	res.json({user:user,msg:'Account Created'});
		        })
	        }
	    });
	});
});
//POST authorise an existing user (accessed at POST http://localhost:8080/api/auth/authenticate)
router.post('/authenticate',function(req,res){
	console.log('Authentication Endpoint');
	var __user = req.body;

	var where = {where:{email:__user.email}};
	models.Users.find(where)
	.then(function(user){
		bcrypt.compare(__user.password, user.password, function(err, result) {
		    // res == true 
		    if(result==true){
		    	user.password = '';
		    	delete user.password;
		    	var user_obj = {email:user.email};
				var token = jwt.sign(user_obj,'brainstationkey');

				res.set('authentication',token);
		    	res.json(user)
		    }
		    else{
		    	res.status(403)
		    		.json({err:'unauhthorized'});
		    }
		});
	});
});

module.exports = router;