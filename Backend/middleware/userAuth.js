const secret_key = "BuySell@123"
const jwt = require('jsonwebtoken');
const User = require('../models/user');


async function userAuth(req, res, next) {

    try {
        const {token}  = req.cookies;
        if(!token){
            return res.status(400).send("Invalid Token")
        }
    var decodedToken = await jwt.verify(token, secret_key);
    const {emailId} = decodedToken;
    
    const user = await User.findOne({emailId: emailId});
    // console.log(user);
    
    if(!user){
        return res.status(400).send("User not Found");
    }
    req.user = user

    next()
    } catch (error) {
       res.status(400).send(error.message)
    }
  
}

module.exports = userAuth