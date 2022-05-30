const express = require('express');
const { createPostCtrl,fetchPostsCtrl,fetchPostCtrl,updatePostCtrl ,deletePostCtrl,toggleAddLikeToPostCtrl,toggleAddDislikeToPostCtrl} = require('../../controllers/posts/postCtrl');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { photoUpload ,postImgResize} = require('../../middlewares/uploads/photoUpload');


//const validateMongodbId = require('../../util/validateMongodbId');


const postRoute=express.Router();
postRoute.post('/',authMiddleware,photoUpload.single('image'),postImgResize,createPostCtrl);
postRoute.get('/',fetchPostsCtrl);
postRoute.get('/:id',fetchPostCtrl);
postRoute.put('/:id',authMiddleware,updatePostCtrl);
postRoute.delete('/:id',authMiddleware,deletePostCtrl);
postRoute.put("/likes/:id",authMiddleware,toggleAddLikeToPostCtrl);
postRoute.put("/dislikes/:id",authMiddleware,toggleAddDislikeToPostCtrl);

module.exports=postRoute;