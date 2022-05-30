const { createCommentCtrl, fetchAllCommentsCtrl, fetchCommentCtrl } = require("../../controllers/comments/commentCtrl");
const express=require("express");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const commentRoutes=express.Router();


commentRoutes.post('/',authMiddleware,createCommentCtrl);
commentRoutes.get('/',authMiddleware,fetchAllCommentsCtrl);
commentRoutes.get('/:id',authMiddleware,fetchCommentCtrl);

module.exports=commentRoutes;