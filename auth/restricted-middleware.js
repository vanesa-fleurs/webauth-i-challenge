const bcrypt = require('bcryptjs')

const Users = require('../users/users-model')

module.exports = (req, res, next) => {
    //grab cookie and check if it's valid!
    //no need to validate password becaue that's being taken care of in the 
    //login & register

    if(req.session && req.session.username) {
        next();
    }
    else{
        res.status(401).json({message: `Invalid Creds.`})
    }
}