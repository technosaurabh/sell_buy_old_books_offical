const { default: mongoose } = require("mongoose");

const category = mongoose.Schema({
    categoryName : {
        type : String,
        unique : true,
        minlength : 3,
        maxlenght : 30,
        lowercase : true
    },
    categoryDescription : {
        type : String,
        minlength : 3,
        maxlenght : 200,
    }
})

module.exports = mongoose.model('category', category)