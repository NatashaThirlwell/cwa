var router = require('express').Router();
var Clients = require('./../models/Clients');
var bcrypt	= require('bcrypt');
var jwt		= require('jsonwebtoken');


router.get('/',function(req,res){
	console.log('Initialization Endpoint');
	var __user = {
		email:'admin@cwa.com',
		password:'admin',
		first_name:'Ryan',
		last_name:'Chick',
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