const {database} = require('./config/database')
const  express  = require("express");
const { authRouter } = require('./routes/authRoute');
const app = express();
const cookieParser = require('cookie-parser');
const categoryRouter = require('./routes/categoryRoute');
const bookRoutes = require('./routes/bookRoutes');
const connectionRoute = require('./routes/connectionRoutes');


// middleware
app.use(cookieParser())
app.use(express.json())

// routes
app.use('/', authRouter)
app.use('/', categoryRouter)
app.use('/', bookRoutes)
app.use('/', connectionRoute);


database().then(()=>{
    app.listen(3000, ()=> {
        console.log("------- server started sucessfully --------------- ")
    })
}).catch((error)=>{
    console.log("ERROR" + error.message)
})




