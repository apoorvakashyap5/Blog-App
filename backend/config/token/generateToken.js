const jwt=require('jsonwebtoken');


const generateToken= (id)=>{
    //sign: genearates a token andd assign to the user
    return jwt.sign({id}, process.env.JWT_KEY, {expiresIn:"20d"});
};

module.exports=generateToken;