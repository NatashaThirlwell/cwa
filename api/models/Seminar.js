var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var seminarSchema = new Schema({
	title:{
		type:String,
		required:true
	},
	type:{
		type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	date:{
		type:String,
		required:true
	},
	location:{
		type:String,
		required:true
	},
	practitioner:{
		type:String,
		required:true
	},
	description:String,
	price:Number,
	capacity:Number,
	duration:String,
	codes:[{code:String,discount:Number,uses:Number}],
	attendees:[{clientId:String}],
	created_at:Date,
	updated_at:Date
});

seminarSchema.pre('save',function(next){
	var currentDate = new Date();

	this.updated_at = currentDate;

	if(!this.created_at){
		this.created_at = currentDate;
	}

	next();
})

var Seminar = mongoose.model('Seminar',seminarSchema);

module.exports = Seminar;