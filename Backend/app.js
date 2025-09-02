const {database} = require('./config/database')
const  express  = require("express");
const { authRouter } = require('./routes/authRoute');
const app = express();
const cookieParser = require('cookie-parser');
const categoryRouter = require('./routes/categoryRoute');
const bookRoutes = require('./routes/bookRoutes');
const connectionRoute = require('./routes/connectionRoutes');
const cors = require('cors');

// middleware
app.use(cookieParser())
app.use(express.json())
// app.use(cors());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // exact Angular URL
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    // If it's a preflight request, end it here
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  
    next();
  });
// routes
app.use('/uploads', express.static('uploads'));
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




