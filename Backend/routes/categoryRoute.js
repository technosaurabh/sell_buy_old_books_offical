const app = require('express');
const userAuth = require('../middleware/userAuth');
// const category = require('../models/category');
const { sendSuccess } = require('../utils/handleResponse');
const category = require('../models/category');
const categoryRouter = app.Router()


// create category
categoryRouter.post('/category', userAuth ,async (req,res, next) => {
    try {
        const {categoryName, categoryDescription} = req.body;
        let body = {
            categoryName,
            categoryDescription
        }
        await category.create(body);
        sendSuccess(true, true, res, {}, "category Created Succesfully", 200)
    } catch (error) {
        sendSuccess(false, true, res, {}, error.message, 400)
    }
}, (error)=> {
    next(error)
})

// get category and get one
categoryRouter.get('/category', userAuth ,async (req,res, next) => {
    try {
        if(req.query.id){
            try{
                const categoryId = req.query.id;
                const categoryField = await category.findById(categoryId);
                if(!categoryField){
                  return sendSuccess(false, true, res, {}, "Category Not Found", 400)
                }
                sendSuccess(true, true, res, categoryField, "Category fetched Successfully", 200)
            }
            catch(error){
                sendSuccess(false, true, res, {}, error.message, 400)
            } 
        }else{
            const allcategory = await category.find({})
            sendSuccess(true, true, res, allcategory, "category Created Succesfully", 200)
        }
    } catch (error) {
        sendSuccess(false, true, res, {}, error.message, 400)
    }
}, (error)=> {
    next(error)
})

// delete category
categoryRouter.delete('/category', userAuth, async (req, res, next) => {
    try {
        const categoryId = req.query.id;
        if(!categoryId){
           return sendSuccess(false, true, res, {}, "Id Not Found", 400)
        }
        const deletedCategory = await category.findByIdAndDelete(categoryId);

        if(!deletedCategory){
            return sendSuccess(false, true, res, {}, "Category Not Found", 400)
        }

         sendSuccess(true, true, res, {}, "Category Successfully Deleted", 200)
    } catch (error) {
        sendSuccess(false, true, res, {}, error.message, 400)
    }
})

// update category
categoryRouter.patch('/category/:id', userAuth, async(req, res, next) => {
    try {
        const {categoryName, categoryDescription} = req.body;
        const categoryId = req.params.id;

        if(!categoryId){
         return sendSuccess(false, true, res, {}, "Invalid Id", 400)
        }

        let body = {
            categoryName,
            categoryDescription
        }   

        const categoryFeild = await category.findByIdAndUpdate({_id : categoryId}, body, {
            runValidators : true
        })
        console.log(categoryFeild, "category")
        
        if(!categoryFeild){
            return sendSuccess(false, true, res, {}, "Category Not Found", 400)
        }
        return sendSuccess(true, true, res, {}, "Category Updated Successfully", 400)
    } catch (error) {
        sendSuccess(false, true, res, {}, error.message, 400)
    }
}, (error)=> {
    next(error);
})



categoryRouter.use('/', async (err,req,res,next)=>{
    return res.status(500).json({
        staus : false,
        success : false,
        message : err.message
    })
})


module.exports = categoryRouter