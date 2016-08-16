var router = require('express').Router();
var Clients = require('./../models/Clients');
var Seminar = require('./../models/Seminar');
var bcrypt	= require('bcrypt');
var jwt		= require('jsonwebtoken');


router.get('/',function(req,res){
	console.log('Initialization Endpoint');
	var __user = {
		email:'admin@cwa.com',
		password:'admin',
		first_name:'root',
		last_name:'admin',
		client_type:'admin'
	}
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
		        		res.send('Admin account created. Email: admin@cwa.com');
		       		})
		       		.catch(function(err){
		       			console.log(err)
		       			res.json({err:err,msg:'Account creation failed'})
		       		})
	        }
	    });
	});
})

router.get('/addSeminar',function(req,res){
	var __seminar = {
		title:"Test Seminar",
		type:"Seminar",
		category:"Seminar",
		date:"August 1 2016",
		location:"CWA",
		practitioner:"Dr. Test",
		description:"Test Seminar",
		price:20.00,
		capacity:50,
		duration:"2 hours",
		codes:[{code:"100%OFF",discount:1,uses:20}],
		attendees:[],
		created_at:new Date(),
		updated_at:new Date()
	}

	var newSeminar = Seminar(__seminar);
	newSeminar.save()
		.then(function(seminar){
			console.log(seminar)
			res.send(seminar);
		})
		.catch(function(err){
			console.log(err)
			res.send(err)
		})
})

module.exports = router;

/*email:{
		type:String,
		required:true,
		unique:true
	},
	password:{
		type:String,
		required:true
	},
	first_name:{
		type:String,
		required:true
	},
	last_name:{
		type:String,
		required:true
	},
	birth_place:String,
	birth_date:String,
	birth_time:String,
	address:String,
	postal_code:String,
	country:String,
	nationality:String,
	phone:String,
	client_type:{
		type:String,
		required:true
	},
	todo_list:[{todo:String,done:Boolean}],
	schedule:[{eventId:String}],
	referrer:String,
	created_at:Date,
	updated_at:Date
}*/