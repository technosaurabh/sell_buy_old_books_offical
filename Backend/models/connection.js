const { default: mongoose } = require("mongoose");
const user = require("./user");
const book = require("./book");


const connectionSchema = mongoose.Schema({
    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : user
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : user
    },
    bookId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: book
    },
    status : {
        type : String,
        required : true
    } 
})


module.exports = mongoose.model('connection', connectionSchema);