const expressAsyncHandler = require("express-async-handler");
const { validate } = require("../../model/post/Post");
const Post = require("../../model/post/Post");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const validateMongodbId = require("../../utils/validateMongodbId");
const fs= require('fs');

//---------------------------------------------------------

 //   console.log(req.file);
  //  const { _id }=req.user;
    //1.get the path to img
 //const localPath= `public/images/posts/${req.file.filename}`;
 //2.upload to cloudinary
 // const imgUploaded= await cloudinaryUploadImg(localPath);
   // try{
     //  const post=await Post.create({...req.body,
     // image:imgUploaded?.url,
     //  user:_id,
     // });
     //   res.json(post); 
        //removed image after uploading it
      //  fs.unlinkSync(localPath);
 //   }
 //   catch(error){res.json(error);}
//});

//const createPostCtrl = expressAsyncHandler(async (req, res) => {
  //  const { _id } = req.user;
   // validateMongodbId(req.body.user);
    //Check for bad words
   // const filter = new Filter();
   // const isProfane = filter.isProfane(req.body.title, req.body.description);
    //Block user
  //  if (isProfane) {
   //   await User.findByIdAndUpdate(_id, {
  //      isBlocked: true,
  //    });
  //    throw new Error(
  //      "Creating Failed because it contains profane words and you have been blocked"
  //    );
  //  }
  //create post controller
const createPostCtrl=expressAsyncHandler(async(req,res)=>{
   try {
     const post = await Post.create(req.body);
     res.json(post);
   } catch (error) {
     res.json(error);
   }
 });
  


//-----------------------------------------------------------
//fetch all posts
const fetchPostsCtrl=expressAsyncHandler(async(req,res)=>{
    //query strength parameter
  //  console.log(req.query);
  const hasCategory=req.query.category;
try{
    //check if it has category selector fetching posts
    if(hasCategory){
        const posts=await Post.find({category:hasCategory}).populate("user").populate("comments");
        res.json(posts);
    }
    //return all posts
    //populte return true alues forvirtual properties 
    //e can add filter in find() like category
 else{
     const posts=await Post.find({}).populate("user").populate("comments");
 res.json(posts);
 }
}catch(error){ res.json(error); }
});


//-------------------------------------------------------------------------------
//fetch a single post


const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  //  console.log(req.user)
  const { id } = req.params;
  
   //  console.log(id);
    //validateMongodbId(id);
    try {
      const post = await Post.findById(id).populate("user").populate("comments");
      res.json(post);
    } catch (error) {
      res.json(error);
    }
  });
  
//---------------------------------------------------------------------------------
//Post update Ctrl

const updatePostCtrl=expressAsyncHandler(async(req,res)=>{
    //console.log(req.user);
    const {id}=req.params;
    validateMongodbId(id);
    try{
     const post=await Post.findByIdAndUpdate(id,{
        // title:req.body.title,
        // description:req.body.description,
        ...req.body, //can update any property and choose what to update
        user:req.user?._id,
     },{new:true,});
     res.json(post);
    }catch(error){
       res.json(error);
    }
});

//-----------------------------------------------------------------------
//Delete Post Ctrl

const deletePostCtrl=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongodbId(id);
    try{
        const post=await Post.findByIdAndDelete(id);
        res.json(post);
    }
    catch(error){
        res.json(error);
    }
});


//-------------------------------------------------------------------------------------------------
//Like the post
 const toggleAddLikeToPostCtrl=expressAsyncHandler(async(req,res)=>{
     console.log(req.user);
   //find the post to be liked
   const {postId}=req.body;
   const post=await Post.findById(postId);
   //find the login user in the array 
   const loginUserId=req?.user?._id;
//find if this user has already liked this post
 const isLiked=post?.isLiked;
 //find if user has disliked already
 const alreadyDisliked=post?.disLikes?.find(userId=>userId?.toString()===loginUserId);
 //remove the user from disLikes array if existing
 if(alreadyDisliked){
     const post=await Post.findByIdAndUpdate(postId,{
         $pull:{disLikes:loginUserId},
         isDisliked:false,
     }, {new:true}
     );
   res.json(post);
}
//remove the user if he has alreadyLiked
//toggle
if(isLiked){
    const post=await Post.findByIdAndUpdate(postId,{
        $pull:{likes:loginUserId},
        isLiked:false,
    },{new:true}
    );  res.json(post);
  }
  //if neber liked add to likes array
  else{
      const post=await Post.findByIdAndUpdate(postId,{
          $push:{likes:loginUserId},
          isLiked:true,
      },{new:true});res.json(post);
  }
 
 });


 //-----------------------------------------------------------------------------------
 //dislike a post
 const toggleAddDislikeToPostCtrl=expressAsyncHandler(async(req,res)=>{
     //1.find the post to be disliked
     const {postId}=req.body;
     const post=await Post.findById(postId);
     //2. find login user
     const loginUserId=req?.user?._id;
     //3. if this user has already disliked the post
     const isDisliked=post?.isDisliked;
     //4.if this user has already liked this post 
     const alreadyLiked=post?.likes?.find(userId=>userId.toString()===loginUserId?.toString());
     //5.remove this user from likes array if already liked
     if(alreadyLiked){
         const post=await Post.findByIdAndUpdate(postId,{
             $pull:{likes:loginUserId},
             isLiked:false,
         },{new:true});
     }
    //6. toggling
    //remove this user from dislikes if already disliked
    if(isDisliked){
        const post=await Post.findByIdAndUpdate(postId,{
            $pull:{disLikes:loginUserId},
            isDisliked:false,
        },{new:true});
    
  res.json(post);
     } else {
     const post=await Post.findByIdAndUpdate(postId,{
         $push:{disLikes:loginUserId},
         isDisliked:true
     },{new:true});
     res.json(post);
 }
 });


 



module.exports={createPostCtrl,fetchPostsCtrl,fetchPostCtrl,updatePostCtrl,deletePostCtrl, toggleAddLikeToPostCtrl,toggleAddDislikeToPostCtrl};