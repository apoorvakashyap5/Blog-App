const expressAsyncHandler=require('express-async-handler');
const User = require('../../model/user/User');
const jwt=require('jsonwebtoken');

//---------------------------------------------------------------------------
//only auth users can fetch

const authMiddleware= expressAsyncHandler(async (req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer') ){
        try{
            token= req.headers.authorization.split(' ')[1];
            if(token){
                const decoded=jwt.verify(token, process.env.JWT_KEY);
                //FIND USER BY ID
                const user=await User.findById(decoded?.id).select("-password");
                //attach user to req object
                req.user= user;
                next();
            }
           else{
           throw new Error("No token attached");
        }
            
        } catch(error){
            throw new Error("Not Authorized");
        } 
        }
        else{
            throw new Error("No token attached to header");
        }
    });

    module.exports=authMiddleware;