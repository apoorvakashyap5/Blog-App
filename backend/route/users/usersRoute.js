const express=require("express");
const {userRegisterCtrl,loginUserCtrl, fetchUsersCtrl, followingUserCtrl,unfollowUserCtrl,profilePhotoUploadCtrl ,fetchUserDetailsCtrl,userProfileCtrl}=require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const { photoUpload,profilePhotoResize } = require("../../middlewares/uploads/photoUpload");



const userRoutes=express.Router();

userRoutes.post("/register",userRegisterCtrl);
userRoutes.post("/login",loginUserCtrl);
userRoutes.get("/",authMiddleware, fetchUsersCtrl);
//userRoutes.get("/:id",fetchSingleUserCtrl);
userRoutes.get("/:id",fetchUsersCtrl);
userRoutes.get("/profile/:id",userProfileCtrl);
userRoutes.put("/follow",authMiddleware,followingUserCtrl);
userRoutes.put("/unfollow",authMiddleware,unfollowUserCtrl);
userRoutes.put("/profilephoto-upload",authMiddleware,photoUpload.single("image"),profilePhotoResize,profilePhotoUploadCtrl);

module.exports=userRoutes;