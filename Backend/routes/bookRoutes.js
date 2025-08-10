const express = require("express");
const book = require("../models/book");
const userAuth = require("../middleware/userAuth");
const { sendSuccess } = require("../utils/handleResponse");
const bookRoutes = express.Router();
const multer  = require('multer');
const fs = require('fs');
const connection = require("../models/connection");
// const book = require("../models/book");



const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename : (req, file, cb) => {
        const suffix = Date.now()
        cb(null, suffix + '-' + file.originalname)
    }
}) 


const upload = multer({storage : storage});


// create book 
bookRoutes.post('/book/create', userAuth, upload.single('file'), async(req,res,next) => {
    try{
    const {title, description, condition, price, category, buyDate, edition} = req.body;
    const photoPath = req.file ? req?.file?.path : null;
    const fromUserId = req.user._id;
    let body = {
        title,
        description,
        condition,
        price,
        category,
        buyDate,
        edition,
        photoURL : photoPath,
        fromUserId : fromUserId,
    }
        await book.create(body);
        return sendSuccess(true, true, res, {}, "Book Created Succsfully", 200)
    }catch(error){
        return sendSuccess(false, true, res, {}, error.message, 200)
    }
})

// delete book
bookRoutes.delete('/book/delete', userAuth,  async(req, res, next) => {
    // checks
    // id should exist in DB

    try{
    const bookId = req.query.id;
    const loginedUser = req.user

    console.log(loginedUser);

    if(!(req.query.id)){
        return sendSuccess(false, true, res, {}, "Invalid Book Id", 400)
    }

   
    const bookFeild = await book.findById(bookId);
    if(!bookFeild){
        return sendSuccess(false, true, res, {}, "Book Not Found", 400)
    }
    // book ke entry ka  (formUserId)  == userAuth._id

    if((bookFeild.fromUserId).toString() != (loginedUser._id).toString()){
        return sendSuccess(false, true, res, {}, "unauthorized user", 400)
    }

    

    // if status is sold then you dont able to delete

    if(bookFeild.status != 'active'){
        return sendSuccess(false, true, res, {}, "Book cannot be deleted as it has already been sold", 400 )
    }

     // if book is delete the photoURL file must be deleted
    await fs.unlink(bookFeild.photoURL, function(err){})

    await book.findByIdAndDelete(bookId);
    return sendSuccess(true, false, res, {}, "Book deleted successfully", 200);


    // connection (request) -- must not be in pending state -- TODO

    }catch(error){
        return sendSuccess(false, true, res, {}, error.message, 400)
    }

   
    
    
}, (error) => {
    next(error)
})

// view book (getone)
bookRoutes.get('/book/view', userAuth, async(req, res, next)=> {
    try {
        const bookId = req.query.id;
        if(!bookId){
             return sendSuccess(false, true, res, {}, "Invalid Book Id", 400)
        }
        const bookFeild = await book.findById(bookId);
        if(!bookFeild){
            return sendSuccess(false, true, res, {}, "Book Not Found", 400)
        }
        return sendSuccess(true, true, res, bookFeild, "Book Fetched Succesfully", 200)
    } catch (error) {
        return sendSuccess(false, true, res, {}, error.message, 400)
    }
},(error)=>{
     next(error);

})


// update book
bookRoutes.patch('/book/update', userAuth, async(req, res, next) => {
    try {
        // check

        // id should be exist in DB
        const bookId = req.query.id;
        const loginedUser = req.user
        
        if(!bookId){
            return sendSuccess(false, true, res, {}, "Invalid Id", 400)
        }

        let bookFeild = await book.findById(bookId);

        if(!bookFeild){
            return sendSuccess(false, true, res, {}, "Book Not Found", 400)
        }

        // fromUserId that equal to the req.user._id (userAuth._id)
        if((loginedUser._id).toString() !=  (bookFeild.fromUserId).toString()){
            return sendSuccess(false, true, res, {}, "unauthorized user", 400);
        }


         // only spesific feild must be updated
        const allowedField = ['title', "description", "condition", "price", "category", "buyDate", "edition"];
        
        const isCorrectFeild =  Object.keys(req.body).every((keys) => allowedField.includes(keys));

        if(!isCorrectFeild){
            return sendSuccess(false, true, res, {}, "Invalid Body", 400);
        }
        // update validation should applied
       
        // update the data in the DB.
        




        const notUpdateFeild = ['_id', 'status', 'startRating', "photoURL" , 'fromUserId', '__v']
        Object.keys(bookFeild.toJSON()).forEach((keys, index)=> 
        {
            // console.log( bookFeild[keys], "book feilds"),
            // console.log(req.body[keys], "body keys")
            // console.log(bookFeild, "book feild")

            if(!(notUpdateFeild.includes(keys))){
                bookFeild[keys] = req.body[keys];
            }


            // console.log(bookFeild, "new book feild");
        }
        
    );

    // bookFeild.save();

    console.log(bookFeild, "bookfeild")


  


    bookFeild.save()

            return sendSuccess(true, true, res, bookFeild, "Book Updated Succesfully", 200)
        





    } catch (error) {
        return sendSuccess(false, true, res, {}, error.message, 400);
        
    }
})


// update photo
bookRoutes.patch('/book/updatephoto', upload.single('file'),  userAuth, async(req, res, next)=>{
    try {
        const bookId = req.body.id
        if(!bookId){
            return sendSuccess(false, true, res, {}, "Invalid Id", 400)
        }
        const bookFeild = await book.findById(bookId);
        if(!bookFeild){
            return sendSuccess(false, true, res, {}, "Book Not Found", 400)
        }
        await fs.unlink(bookFeild.photoURL, function(err){})
        const photoPath = req.file ? req?.file?.path : null;
         bookFeild.photoURL = photoPath;
         bookFeild.save();
         return sendSuccess(true, true, res, {}, "Book Photo Updated Succesfully", 200)
    } catch (error) {
        return sendSuccess(true, true, res, {}, error.message, 200)
    }
},  (error) => {
    return sendSuccess(true, true, res, {}, error.message, 400)
},)


//feed api
bookRoutes.get('/book/feed', userAuth, async(req,res, next)=> {
    try {

        const blockedBookIds = await connection.find({
               fromUserId: req.user._id
    
          }).distinct('bookId');

        const feed = await book.find({
            status : 'active',
            fromUserId: { $ne: req.user._id }, 
            _id : {$nin : blockedBookIds}
        });


        console.log(feed);

        

        if(feed.length == 0){
            return sendSuccess(false, true, res, {}, "Book Not Found", 400)
        }

        return sendSuccess(true, true, res, feed, "Book Fetched Sucesfully", 200)

    } catch (error) {
        
    }
})






// route for error handle
bookRoutes.use('/', async (err,req,res,next)=>{
    return res.status(500).json({
        staus : false,
        success : false,
        message : err.message
    })
})


module.exports = bookRoutes