const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
//const {userRegisterCtrl}=require("./controllers/users/usersCtrl");

dotenv.config();
const dbConnect=require("./config/db/dbConnect");
const userRoutes = require('./route/users/usersRoute');
const { errorHandler, notFound } = require('./middlewares/error/errorHandler');
const postRoute = require('./route/posts/postRoute');
const commentRoutes=require('./route/comments/commentRoute');
const categoryRoute=require('./route/category/categoryRoute');


const app =express();
//DB
dbConnect();
//console.log(process.env);

//44wZEwgCesFRbqLb   password
//post:create 

//Middleware
app.use(express.json());
//cors
app.use(cors()); // bcs from frontend server was blocked by cors

//Custom Middleware
//const logger=(req,res,next)=>{
//    console.log("I am a logger");
//    next(); //req to move to next middleware
//};

//usage of middleware
//app.use(logger);

//Register,Login shifted to userRoute
//app.post("/api/users/register",userRegisterCtrl);
//app.put("/api/users/register",userRegisterCtrl);
//UserRoute
app.use("/api/users", userRoutes);
//PostRoute
app.use("/api/posts",postRoute);
//commentRoute
app.use("/api/comments",commentRoutes);
//categoryRoute
app.use("/api/category",categoryRoute);

//Login
//app.post("/api/users/login",(req,res)=>{
    //business logic
  //  res.json({user:"User Logged In"});
  // });

  
//Get (Fetch) users
//app.get("/api/users",(req,res)=>{
    //business logic
   // res.json({user:"Fetch all users"});
 // });

  //Delete users
//app.delete("/api/users",(req,res)=>{
    //business logic
  //  res.json({user:"Fetch all users"});
 // });
 
 //errorhandler
 app.use(notFound);
 app.use(errorHandler);

 //server
 const PORT=process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running on ${PORT}`)); 