
const { mongoose } = require("mongoose");


const DB_URL = 'mongodb+srv://technostorage10:bYHtEZi8ueOp6Kjf@cluster0.lpqx1e4.mongodb.net/buySellOldBooks';


const database =  async (params) => {
    return await mongoose.connect(DB_URL);
    
}

module.exports = {database}