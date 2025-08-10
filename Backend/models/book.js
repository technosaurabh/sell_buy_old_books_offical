const { default: mongoose } = require("mongoose");
const user = require("./user");



const bookSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description: {
        type : String,
        required : true,
    },
    condition : {
        type : String,
        enum : {
            values: ['good', 'bad', 'worst'],
            message : '{value} is Invalid Status'
        },
        required : true
    },
    status :{
        type : String,
        enum : {
            values : ['active', 'sold'],
            message : '{value} is Invalid Status'
        },
        default : "active"
    },
    price : {
        type : Number,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    startRating : {
        type : Number,
        default: 0
    },
    buyDate : {
        type : Date,
        required : true,
    },
    photoURL : {
        type: String,
        required : true,
    },
    edition : {
        type : String,
        require : true,
    },
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        // ref: user,
    }
})


module.exports = mongoose.model('book', bookSchema)