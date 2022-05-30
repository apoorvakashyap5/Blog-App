const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const User=require("../../model/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const fs=require('fs');




//Register
const userRegisterCtrl= expressAsyncHandler(async (req,res)=>{
    //check if user exists
    const userExists= await User.findOne({email:req.body.email});
   if(userExists) throw new Error("user already exists");
   // console.log(req.body);
   //--------------------------------------------------------
    //Regsiter user
    try{
        //const user= await User.create({
            //firstName:"Aparajita",
           // lastName:"Kashyap",
         //   email:"aparajita@gmail.com",
       //     password:"123456",
     //   });
    
       const user=await User.create({
           firstName:req.body.firstName,
           lastName:req.body.lastName,
           email:req.body.email,
          password:req.body.password,
       });
       
        res.json(user);
    }
    catch(error){res.json(error);}
  }
);
//---------------------------------------------------------------
//Login user
const loginUserCtrl=expressAsyncHandler(async (req,res)=>{
  const {email, password}=req.body;
  //check if user exists
  const userFound=await User.findOne({email});
  //check if password matched
  if(userFound && (await userFound.isPasswordMatched(password))){
    res.json({
      _id:userFound?._id,
      firstName:userFound?.firstName,
      lastName:userFound?.lastName,
      email:userFound?.email,
      password:userFound?.password,
      profilePhoto:userFound?.profilePhoto,
      isAdmin:userFound?.isAdmin,
     token:generateToken(userFound?._id),
    });
    
  }
  else{
    res.status(401);
    throw new Error("Invalid login credentials");
  }
});
//--------------------------------------------------------------------
//users

const fetchUsersCtrl= expressAsyncHandler(async(req,res)=>{
  console.log(req.headers);
  try{
    const users=await User.find({});
    res.json(users);
  }catch(error){
    res.json(error);
  }
});


//-----------------------------------------------
//following
 
const followingUserCtrl=expressAsyncHandler(async(req,res)=>{
  //1.find user you want to follow and update its followers property
  //2.update logged in user following
  const {followId}=req.body;
  const loginUserId=req.user.id;
 // find target user and check if the login userId exists in the other persons array
 const targetUser= await User.findById(followId);
 const alreadyFollowing= targetUser?.followers?.find(user =>user?.toString()===loginUserId.toString());
  if(alreadyFollowing) throw new Error("Already following this user");
 //step1.
 await User.findByIdAndUpdate(followId,{
   $push:{followers:loginUserId},
 //  isFollowing:true,  
  }, {new:true} 
 );
 //step2.
 await User.findByIdAndUpdate(loginUserId,{
   $push:{following:followId},
 });
 res.json("Succesfully followed this user");
});



//--------------------------------------------------------------------
//unfollowing


const unfollowUserCtrl = expressAsyncHandler(async (req, res) => {
  //1.find user you want to unfollow and update its followers property
  //2.update logged in user following
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    { new: true }
  );

  res.json("You have successfully unfollowed this user");
});






//----------------
//user details
//----------------
const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  //validateMongodbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//User profile can fetch all posts created by this user
//------------------------------

const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
 // validateMongodbId(id);
  try {
    const myProfile = await User.findById(id).populate('posts');
    res.json(myProfile);
  } catch (error) {
    res.json(error);
  }
});





//--------------------------------------------------------------
//ProfilePhoto upload

const profilePhotoUploadCtrl=expressAsyncHandler(async(req,res)=>{
// find login user id in order to update his profile photo
 const {_id}=req.user;
 
 //1.get the path to img
 const localPath= `public/images/profile/${req.file.filename}`;
 //2.upload to cloudinary
  const imgUploaded= await cloudinaryUploadImg(localPath);
  const foundUser= await User.findByIdAndUpdate(_id,{
   profilePhoto:imgUploaded?.url,
  },{new:true});
  //remove uploaded img from local
  fs.unlinkSync(localPath);

 res.json(foundUser);
});

  //------------------------------
//Delete user
//------------------------------

const deleteUsersCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongodbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

//------------------------------
//Update profile
//------------------------------
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  validateMongodbId(_id);

  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

//----------------------------------------------------------------------
//fetch single user details
//const fetchSingleUserCtrl=expressAsyncHandler(async(req,res)=>{
  //try{
   // const singleUser=await User.findById(id);
    //res.json(singleUser);
  //}catch(error){ res.json(error);}
//});

  module.exports={userRegisterCtrl, loginUserCtrl, fetchUsersCtrl, deleteUsersCtrl,profilePhotoUploadCtrl,followingUserCtrl, unfollowUserCtrl, userProfileCtrl, fetchUserDetailsCtrl};