var models 	= require('./../models');
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
	models.Users.findAll().then(function(users){
		//findall returns an array of objects
		console.log(users);
		res.json({
			users:users
		});
	});
});

// GET the user with that id (accessed at GET http://localhost:8080/api/users/:userId)
router.get('/:userId',function(req, res) {
	console.log('Getting user with ID: '+req.params.userId);
	var where = {where:{id:req.params.userId}};
    models.Users.find(where).then(function(user){
		console.log(user.name);
		res.json({
			user:user
		});
	});
});

// PUT update the user with this id (accessed at PUT http://localhost:8080/api/users/:userId)
router.put('/:userId',function(req, res) {
	var where = {where:{id:req.params.userId}};
	var __user = req.body;
	models.Users.find(where).then(function(user){
		user.updateAttributes({
		    type:__user.type,
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
		    phone_number:__user.phone_number,
	    });

	     __user.id = req.params.userId;
    	res.json({
			user:__user
		});
	});
});
	
// DELEte the bear with this id (accessed at DELETE http://localhost:8080/api/users/remove/:userId)
router.delete('/remove/:userId',function(req, res) {
    var where = {where:{id:req.params.userId}}
    models.Users.find(where).then(function(user){
		user.destroy();
		res.json({
			deleted:true
		});	
	});
});

module.exports = router;