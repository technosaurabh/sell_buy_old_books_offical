const express = require('express');
const authRouter = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const userAuth = require('../middleware/userAuth');
const { sendSuccess, sendError } = require('../utils/handleResponse');
const secret_key = "BuySell@123"
const  fieldsToRemove = ['password', '__v', 'status', 'profilePic']
const validator = require('validator');

// register user
authRouter.post('/register', async (req, res, next)=>{

    try {
        const {firstName, lastName, emailId, phoneNumber, address, gender, password, profilePic, status } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        let body = {
            firstName,
            lastName,
            emailId,
            phoneNumber,
            address,
            gender,
            password : passwordHash,
            profilePic,
            status
        }
        await User.create(body);

        return sendSuccess(true, true, res, {}, "User Created Successfully", 200)
    } catch (error) {
        return sendSuccess(false, true, res, {}, error.message, 400 )
    }
}, (error) => {
    return next(error)
} ) 


// login
authRouter.post('/login', async (req, res, next) => {
    try {
        const {emailId, password} = req.body

        let user = await User.findOne({emailId: emailId})

        if(!user){
            // return res.status(400).send("Invalid Credentials");
        return sendSuccess(false, true, res, {}, "Invalid Credentials", 400)

        }
        const isPasswordValid  = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
        return sendSuccess(false, true, res, {}, "Invalid Credentials", 400)

        }
        const jwtToken = await jwt.sign({ emailId: emailId }, secret_key, {expiresIn:'1d'});

        res.cookie('token' , jwtToken, 
            {
                httpOnly: true,
                secure: false,   // true in production
                sameSite: "lax",  // "none" in production
                maxAge: 60 * 1000000
            }
        );

        user = user.toObject(); // convert Mongoose doc to plain object

       
        fieldsToRemove.forEach(field => delete user[field]);

    

        return sendSuccess(true, true, res, user, "login Successfully", 200)
    } catch (error) {
        next(error);
    }
})



// delete api
authRouter.delete('/delete', userAuth, async(req,res, next) => {
    try {
       let user = req.user; 

       console.log(user, "user get from the userAuth");

    await User.findByIdAndDelete({_id : user._id});
    user = user.toObject()
    fieldsToRemove.forEach((keys) => delete user[keys]);

    sendSuccess(true, true,res, user,  'user deleted successfully', 200)
    } catch (error) {
        sendSuccess(false, true,res, {},  error.message, 400)
    }
})

// profile API
authRouter.get('/profile', userAuth, async(req, res, next)=> {
    try {
        user = req.user.toObject();
        ['password', '__v', 'status'].forEach(keys => delete user[keys])
        sendSuccess(true, true, res, user, 'Profile Fetched Successfully', 200)
    }
    catch(error){
        sendSuccess(false, true, res, {} , error.message, 400)
    }
}, (error)=> {
    next(error)
})



// update API 
authRouter.patch('/update', userAuth , async function(req, res, next) {
    try{
    const loginedUser = req.user;
    const user = req.body;
    const notAllowedFeilds = ['password', 'profilePic', 'emailId'];
    console.log(Object.keys(user));
    const isBodyValid = await Object.keys(user).some(keys =>  notAllowedFeilds.includes(keys))

    if(isBodyValid){
        return sendSuccess(false, true, res, {}, "Invalid Feild in Body", 400)
    }

    Object.keys(user).forEach((keys) => loginedUser[keys] = user[keys]);

    loginedUser.save();

    return sendSuccess(true, true, res, {}, "User Updated Succsfully", 200)
    }
    catch(error){
        return sendSuccess(true, true, res, {}, error.message, 400)
    }
}, (error)=> {
    next(error);
})

// update password
authRouter.patch('/password', userAuth, async (req, res, next) => {

    try{
        const loginUser = req.user;
        const payload = req.body
        const allowedField = ['newPassword', 'oldPassword', 'reNewPassword'];
        const isFieldIncluded  = Object.keys(req.body).every((keys)=> {
           return allowedField.includes(keys)
        })
        if(!isFieldIncluded){
            sendSuccess(false, true, res, {}, "Invalid payload", 200)
        }

        const isOldPasswordValid = await bcrypt.compare(payload.oldPassword, loginUser.password)

        if(!isOldPasswordValid){
            return sendSuccess(false, true, res, {}, "Invalid Old Password", 200)
        }

        if(!(validator.isStrongPassword(payload.newPassword))){
           return sendSuccess(false, true, res, {}, "New Password is Not strong", 200)
        }
    
        if(payload.newPassword != payload.reNewPassword){
           return sendSuccess(false, true, res, {}, "new Password is not match with old password", 200)
        }
    
        const newPasswordHash = await bcrypt.hash(payload.newPassword, 10)
        loginUser.password = newPasswordHash;
        loginUser.save()
        sendSuccess(true, true, res, {}, "Password succsufully updated", 200)


    }catch(error){
        sendSuccess(false, true, res, {}, error.message, 200)

    }
  

}, (error) => {
    next()
})


// route for error handle
authRouter.use('/', async (err,req,res,next)=>{
    return res.status(500).json({
        staus : false,
        success : false,
        message : err.message
    })
})


module.exports = {authRouter}
