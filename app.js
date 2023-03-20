const express = require("express");
const cors = require("cors")
const app = express();
const Error=require('./Utils/ErrorHandler/ErrorHandler')
const GloBalErrorHandler =require('./Middleware/Error/Error')

const adminApi =require('./Routes/adminRoutes')



app.use(express.urlencoded({extended:true,limit:"50000kb"}))
app.use(express.json({limit:"50000kb"}))




//handling the cros errro
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use('/api/admin',adminApi)

// Page Not Found Error
app.use('*',(req,res,next)=>{
    next(new Error(`can't find ${req.originalUrl} on this server`,404))
})


// Global Error Handler
app.use(GloBalErrorHandler)



module.exports =app