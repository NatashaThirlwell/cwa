var Clients	= require('./../models/Clients')
// var models 	= require('./../models');
var router 	= require('express').Router();
var mongoose = require('mongoose');
var multer = require('multer');

//multer configuration
var storage = multer.diskStorage({
	destination:function(req, file, callback){
		callback(null,'./app/uploads');
	},
	filename: function(req, file, callback){
		console.log(file)
		var originalName = file.originalname;
		var fileExtension = originalName.split('.').slice(-1);
		originalName = originalName.split('.').slice(0,-1).join('.');
		console.log('name:' + originalName)
		callback(null,originalName + '-' + Date.now() + '.' + fileExtension);
	}
});

var upload = multer({storage:storage}).any();
// upload(req, res, function(err){
// 		console.log(req.files)
// 		if(err){
// 			console.log(err)
// 			res.send(err);
// 			throw err;
// 		}
// 		console.log(req.files[0].path)
// 		res.send(req.files[0].path)
// 	})

// var upload = multer({storage: storage}).any();

// profile picture upload endpoint
router.post('/upload/:userId', function(req, res) {
	console.log('receive upload req')
	upload(req, res, function(err) {
		if (err) {
			res.send(err);
			console.log(err);
			throw err;
		} 
			//need to get filename response from multer
			console.log('file', req.files)
			// console.log('filepath', req.file.path)
			var filepath = "PLACEHOLDER";
			res.send(filepath)
			// var where = {"_id":req.params.userId};
			// Clients
			// 	.findOne(where)
			// 	.then(function(client){
			// 		client.updateAttributes({
			// 			profile_pic: filepath
			// 		})
			// 		res.send('Picture has been added');
			// 	})	
		// }
	});
});

//-----------------------------------------------
// middleware to use for all requests
// router.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });

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
	var where = {_id:req.params.userId};
	// console.log(mongoose.Types.ObjectId.isValid(req.params.userID));
	// console.log(where)
    Clients.findById(where)
    .then(function(user){
    	console.log('user',user)
    	if(user == null){
    		res.status(403)
    			.json('User not found.')
    	}
    	else{
    		console.log(user)
			res.json({
				user:user
			});
		}
	})
	.catch(function(err){
		console.log(err);
		res.status(403)
			.json('User not found.')
	})
});

// PUT update the user with this id (accessed at PUT http://localhost:8080/api/users/:userId)
// This endpoint is for users, changing client type is restricted to admin
router.put('/:userId',function(req, res) {
	var where = {_id:req.params.userId};
	var __user = req.body;
	Clients.findOne(where)
	.then(function(user){
		user.updateAttributes({
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
	if(req.decoded.type === 'admin'){
	    var where = {_id:req.params.userId};
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
	} 
	else {
		res.json('Not authorized to perform this action')
	}
});

module.exports = router;