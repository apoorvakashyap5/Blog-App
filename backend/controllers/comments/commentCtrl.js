const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../model/comments/Comment");
const Post = require("../../model/post/Post");
const User = require("../../model/user/User");


//--------------------------------------------------------------------------------------
//create comment
 const createCommentCtrl=expressAsyncHandler(async(req,res)=>{
     //1.get the user
     const user=req.user;
     //2.get the postId
     const {postId, description}=req.body; //requestng from user body
     try{
        const comment=await Comment.create({
            post:postId,
            user,
            description,
        });
        res.json(comment);
     }catch(error){
         res.json(error);
     }
    
 });

 //----------------------------------------------------------------------------------------
 //fetch all comments
 const fetchAllCommentsCtrl=expressAsyncHandler(async(req,res)=>{
     try{
         const comments=await await Comment.find({}).sort("-created");
         res.json(comments);
     }
     catch(error){
         res.json(error);
     }
 });


 //-----------------------------------------------------------------------------------------
 //fetch single comment
 const fetchCommentCtrl=expressAsyncHandler(async(req,res)=>{
     const{id}= req.params;
     try{
         const comment=await Comment.findById(id);
         res.json(comment);
     }
     catch(error){ res.json(error);}
 });



 module.exports={createCommentCtrl, fetchAllCommentsCtrl, fetchCommentCtrl};