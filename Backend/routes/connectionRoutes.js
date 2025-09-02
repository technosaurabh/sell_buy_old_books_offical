const express = require('express');
const userAuth = require('../middleware/userAuth');

const { sendSuccess } = require('../utils/handleResponse');
const connection = require('../models/connection');
const book = require('../models/book');

const connectionRoute = express.Router();
const showUserData = 'firstName lastName '

// send connection request
connectionRoute.post('/request/sendConnection', userAuth, async (req,res, next) => {

    try{
        const fromUserId = req.user._id;
        const bookId = req.query.bookId;
        const status = 'pending';

        if(!bookId){
            return sendSuccess(false, true, res, {}, "Invalid Book Id", 400)
          }


        const isBookIdValid = await book.findById(bookId);

        if(!isBookIdValid){
            return sendSuccess(false, true, res, {}, "Book Not Found!!", 400)
        }

        if(fromUserId.toString() == (isBookIdValid.fromUserId).toString()){
            return sendSuccess(false, true, res, {}, "Sending Request to Yourself is not Allowed", 400)
        }

       
        const isAlreadyConnection = await connection.findOne({
            fromUserId : fromUserId,
            bookId : bookId,
            status : {$ne : 'rejected'}
        })

        console.log(isAlreadyConnection, "is already connected");

        if(isAlreadyConnection){
            return sendSuccess(false, true, res, {}, "Connection Already Exist", 400)
        }         
        let body = {
            fromUserId,
            toUserId : isBookIdValid.fromUserId,
            bookId : bookId,
            status : status
        }

        console.log("first")
        await connection.create(body);
        return sendSuccess(true, true, res, {}, "Connection Send Successfully", 200);
    }catch(error){
        return sendSuccess(false, true, res, {}, "Invalid Book Id", 400);
    }
}, (error)=>{
    return sendSuccess(false, true, res, {}, error.message, 400)
})


// review connection request\
connectionRoute.patch('/request/reviewConnection', userAuth, async (req,res, next ) => {
    // checks

    try{

    

    const bookId = req.body.bookId;
    const status = req.body.status;
    const loginedUser = req.user;
    const connectionId = req.query.id;

    const isBookValid = await book.findById(bookId);

    if(!isBookValid){
        return  sendSuccess(false, true, res, {}, "Invalid Book Id", 400);
    }

    console.log(isBookValid, "is book valid")

    validStatus = ['accepted', 'rejected'];

    if(!(validStatus.includes(status))){
        return  sendSuccess(false, true, res, {}, `${status} is Invalid Status`, 400);
    }

    if((loginedUser._id).toString() != (isBookValid.fromUserId).toString()){
        return  sendSuccess(false, true, res, {}, `unauthorized user`, 400);
    }

    const isConnectionValid = await connection.findOne({
        _id : connectionId,
        toUserId : loginedUser._id,
        bookId : isBookValid._id,
        status : 'pending'
    })

    if(!isConnectionValid){
        return  sendSuccess(false, true, res, {}, `Connection Not Found`, 400);

    }

    console.log(isConnectionValid, "is connection valid")

    isConnectionValid.status = status;

    console.log(isConnectionValid, "isconnection valid")

    await isConnectionValid.save();

    if(status == 'accepted'){
    isBookValid.status = 'sold';
    isBookValid.save();
    }

    if(status == 'accepted'){
        rejectOtherConnection(loginedUser, isBookValid)
    }

    sendSuccess(true, true, res, {},  `${status} Succesfully`, 200);
     
    // console.log(isConnectionValid, "is connection valid");

}catch(error){
     sendSuccess(false, true, res, {},  error.message, 400);
}
})


async function rejectOtherConnection(loginedUser, isBookValid){
    const otherConnections = await connection.find({
        toUserId : loginedUser._id,
        bookId : isBookValid._id,
        status : 'pending'
    })
    
    otherConnections.forEach(element => {
        element.status = 'rejected';
        element.save()
    });

    console.log(otherConnections, "otherconnections")


}



// pending request
connectionRoute.get('/request/pendingRequest', userAuth, async (req,res,next) => {
    try {
        const pendingRequest = await connection.find({
            toUserId : req.user._id,
            status : 'pending',
        }).populate('fromUserId', showUserData).populate('bookId', {})
        return sendSuccess(true, true, res, pendingRequest, "Pending Request Fetched Sucessfully", 200);
    } catch (error) {
        return sendSuccess(false, true, res, {}, error.message, 400);
    }
})

// on going pending connection
connectionRoute.get('/request/onGoingPendingConnection', userAuth, async(req, res, next)=> {

    try {
        const pendingRequest = await connection.find({
            fromUserId : req.user._id,
            status : 'pending',
        }).populate('bookId', {}).populate('toUserId', 'firstName lastName emailId phoneNumber address geneder')

        return sendSuccess(true, true, res, pendingRequest, "On Going Request Fetched Sucessfully", 200);
    } catch (error) {
        return sendSuccess(false, true, res, {}, error.message, 400);
    }

})



// connections
connectionRoute.get('/request/connections', userAuth, async(req, res, next)=> {
    try {
        const connections = await connection.find({
            fromUserId : req.user._id,
            status: { $ne: "pending" }
        }).populate('toUserId', 'firstName lastName emailId').populate('bookId', {})
        return sendSuccess(true, true, res, connections, "Connections Fetched Succesfully", 200);

    } catch (error) {
        return sendSuccess(false, true, res, {}, error.message, 400);
    }

})





module.exports = connectionRoute;