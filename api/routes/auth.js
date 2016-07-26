
var Clients	= require('./../models/Clients')
var bcrypt	= require('bcrypt');
var jwt		= require('jsonwebtoken');
var router 	= require('express').Router();

//POST register a new user (accessed at POST http://localhost:8080/api/auth/register)
router.post('/register',function(req,res){
	console.log('Registration Endpoint');
	var __user = req.body;
	__user.client_type = 'client';
	console.log(__user)
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(__user.password, salt, function(err, hash) {
	    	if(!err){
	    		console.log('hashed',hash)
	    		__user.password = hash;
		        var newClient = Clients(__user)
		        newClient.save()
		        	.then(function(user){
		        		console.log(user)
		        		user.password ='';
		        		res.json({user:user,msg:'Account Created'});
		       		})
		       		.catch(function(err){
		       			console.log(err)
		       			res.json({err:err,msg:'Account creation failed'})
		       		})
	        }
	    });
	});
});
//POST authorise an existing user (accessed at POST http://localhost:8080/api/auth/authenticate)
router.post('/authenticate',function(req,res){
	console.log('Authentication Endpoint');
	var __user = req.body;

	var where = {email:__user.email};
	// models.Users.find(where)
	Clients.findOne(where)
	.then(function(user){
		bcrypt.compare(__user.password, user.password, function(err, result) {
		    // res == true 
		    if(result==true){
		    	user.password = '';
		    	delete user.password;
		    	var user_obj = {email:user.email,type:user.client_type};
				var token = jwt.sign(user_obj,'cwaauthkey');

				res.set('authentication',token);
		    	res.json(user)
		    }
		    else{
		    	res.status(403)
		    		.json({err:'unauthorized'});
		    }
		});
	})
	.catch(function(err){
		console.log(err)
		res.json(err)
	})
});

module.exports = router;