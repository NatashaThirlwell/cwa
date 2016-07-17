// Create instance of Mongoose and connect to our local
// MongoDB database at the directory specficied earilier.
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data/db/');

// Log to console any errors or a successful connection.
var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log("Connected to db at /data/db/")
});

