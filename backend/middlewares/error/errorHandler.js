//notFound
const notFound=(req,res,next)=>{
    const error=new Error(`Not Found -${req.originalUrl}`);
    res.status(404);
    next(error); //passing to next middleware in pipeline 
 };


//to send error to de displayed on frontend we need in json so this is to convert to json

const errorHandler=(err, req, res, next)=>{
   const statusCode=res.statusCode===200?500:res.statusCode;
   res.status(statusCode);
   res.json({
       message:err?.message,
       stack:process.env.NODE_ENV==='production'?null: err.stack,
   });
}

module.exports={errorHandler,notFound};