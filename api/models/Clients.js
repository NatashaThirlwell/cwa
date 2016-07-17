var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var clientSchema = new Schema({
	email:{
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
});

clientSchema.pre('save',function(next){
	var currentDate = new Date();

	this.updated_at = currentDate;

	if(!this.created_at){
		this.created_at = currentDate;
	}

	next();
})

var Clients = mongoose.model('Clients',clientSchema);

module.exports = Clients;


    // type: DataTypes.STRING,
    // first_name: DataTypes.STRING,
    // last_name: DataTypes.STRING,
    // email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // birth_place: DataTypes.STRING,
    // birth_date: DataTypes.STRING,
    // birth_time: DataTypes.STRING,
    // address: DataTypes.STRING,
    // postal_code: DataTypes.STRING,
    // country: DataTypes.STRING,
    // phone_number: DataTypes.STRING