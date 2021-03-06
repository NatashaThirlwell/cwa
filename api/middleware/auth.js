var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['authentication'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'cwaauthkey', function(err, decoded) {          
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });      
            } else {
                // if everything is good, save to request for use in other routes
                console.log('decoded',decoded)
                req.decoded = decoded;  
                next();
            }
        });
        
    } else {
        // if there is no token
        // return an error
        /*
        Notice there is no next here. The API request stops
        here and does not go on to the next logical step
        defined in our code
        */
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.'
        });

    }

};