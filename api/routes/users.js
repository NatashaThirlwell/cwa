var Clients	= require('./../models/Clients')
// var models 	= require('./../models');
var router 	= require('express').Router();

//-----------------------------------------------
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// GET all users (accessed at GET http://localhost:8080/api/users)
router.get('/',function(req,res){
	// models.Users.findAll()
	Clients.find({})
	.then(function(clients){
		//findall returns an array of objects
		console.log(clients);
		res.json({
			clients:clients
		});
	});
});

// GET the user with that id (accessed at GET http://localhost:8080/api/users/:userId)
router.get('/:userId',function(req, res) {
	console.log('Getting user with ID: '+req.params.userId);
	var where = {id:req.params.userId};
    Clients.find(where)
    .then(function(user){
		console.log(user.email);
		res.json({
			user:user
		});
	});
});

// PUT update the user with this id (accessed at PUT http://localhost:8080/api/users/:userId)
router.put('/:userId',function(req, res) {
	var where = {id:req.params.userId};
	var __user = req.body;
	Clients.findOne(where)
	.then(function(user){
		user.updateAttributes({
		    client_type:__user.type,
		    first_name:__user.first_name,
		    last_name:__user.last_name,
		    email:__user.email,
		    password:__user.password,
		    birth_place:__user.birth_place,
		    birth_date:__user.birth_date,
		    birth_time:__user.birth_time,
		    address: __user.address,
		    postal_code:__user.postal_code,
		    country:__user.country,
		    nationality:__user.nationality,
		    phone:__user.phone,
		    todo_list:__user.todo_list,
		    schedule:__user.schedule,
		    referrer:__user.referrer
	    });
	     // __user.id = req.params.userId;
    	res.json({
			user:__user
		});
	})
	.catch(function(err){
		console.log(err);
		res.json(err);
	})
});
	
// DELEte the client with this id (accessed at DELETE http://localhost:8080/api/users/remove/:userId)
router.delete('/remove/:userId',function(req, res) {
    var where = {id:req.params.userId};
    Clients.findOne(where)
	    .then(function(user){
			return user.remove()
		})
		.then(function(res){
			res.json(res)
		})
		.catch(function(err){
			console.log(err);
			res.json(err)
		})
});

module.exports = router;