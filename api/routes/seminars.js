var Seminar	= require('./../models/Seminar')
// var models 	= require('./../models');
var router 	= require('express').Router();
//-----------------------------------------------

//PUBLIC ROUTES - SHOULDNT NEED TO BE LOGGED IN FOR THIS
// GET all seminars (accessed at GET http://localhost:8080/api/seminars)
router.get('/',function(req,res){
	Seminar.find({})
	.then(function(seminars){
		console.log(seminars);
		res.json({
			seminars:seminars
		});
	});
});

// GET the seminar with given id (accessed at GET http://localhost:8080/api/seminars/:id)
router.get('/:id',function(req, res) {
	var where = {id:req.params.id};
    Seminar.find(where)
    .then(function(seminar){
		res.json({
			seminar:seminar
		});
	})
	.catch(function(err){
		console.log(err)
		res.json(err)
	})
});
//END PUBLIC ROUTES


//PUT add a user to a seminar (accessed at PUT  http://localhost:8080/api/seminars/register/:id)
router.put('/register/:id',function(req,res){
	var where = {id:req.params.id};
	var __client = req.body.client;
	if(req.body.code){
		
	}
})


// ADMIN ROUTES
// POST create a new seminar (accessed at POST http://localhost:8080/api/seminars)
router.post('/',function(req,res){
	if(req.decoded.type == 'admin'){
		console.log('Registration Endpoint');
		var __seminar = req.body;
		var newSeminar = Seminar(__seminar)
	    newSeminar.save()
	    	.then(function(seminar){
	    		console.log(seminar)
	    		res.json({seminar:seminar,msg:'Seminar created'});
	   		})
	   		.catch(function(err){
	   			console.log(err)
	   			res.json({err:err,msg:'Seminar creation failed'})
	   		})
	} 
	else {
		res.json('Not authorized to perform this action')
	}

})


// PUT update the seminar with this id (accessed at PUT http://localhost:8080/api/seminars/:id)
router.put('/:id',function(req, res) {
	if(req.decoded.type == 'admin'){
		var where = {id:req.params.id};
		var __seminar = req.body;
		var now = new Date();
		Seminar.findOne(where)
		.then(function(seminar){
			seminar.updateAttributes({
				title:__seminar.title,
				type:__seminar.type,
				category:__seminar.category,
				date:__seminar.date,
				location:__seminar.location,
				practitioner:__seminar.practitioner,
				description:__seminar.description,
				price:__seminar.price,
				capacity:__seminar.capacity,
				duration:__seminar.duration,
				codes:__seminar.codes,
				attendees:__seminar.attendees,
				updated_at:now
		    });
	    	res.json({
				seminar:__seminar
			});
		})
		.catch(function(err){
			console.log(err);
			res.json(err);
		})
	} 
	else {
		res.json('Not authorized to perform this action')
	}
});
	
// Delete the seminar with this id (accessed at DELETE http://localhost:8080/api/seminars/remove/:id)
router.delete('/remove/:id',function(req, res) {
	if(req.decoded.type == 'admin'){
	    var where = {id:req.params.id};
	    Seminar.findOne(where)
		    .then(function(seminar){
				return seminar.remove()
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

//END ADMIN ROUTES

module.exports = router;


//Code for verifying promo codes, need to figure out where in process to handle payment info.
// function testCode(id,code){
// 	var valid = false;
// 	var action;
// 	var __event = self.events[id]
// 	console.log(code)
// 	for(var i = 0;i < __event.codes.length; i++){
// 		if(code === __event.codes[i].code){
// 			valid = true;
// 			action = __event.codes[i].action;
// 		}
// 	}

// 	if(valid === false){
// 		console.log('invalid')
// 		return "invalid";
// 	} else {
// 		return action;
// 	}
// }

// function register(id,name,code){
// 	if(code){
// 		if(self.testCode(id,code.code) !== 'invalid'){
// 			self.events[id].attendees.push({
// 				name:name,
// 				code:code
// 			})

// 		}
// 	}else{
// 		self.events[id].attendees.push({
// 				name:name
// 			})
// 	}
// }