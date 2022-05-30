const mongoose=require('mongoose');
const bcrypt= require('bcrypt')

//create schema
const userSchema=new mongoose.Schema({
    firstName:{
        required:[true,'First name is required'],
        type: String,
    },
    lastName:{
        required:[true,'Last name is required'],
        type: String,
    },
    profilePhoto:{
        type:String, 
        default: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png",
     },
    email:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    postCount:{
        type:Number,
        default:0,
    },
    
    isAdmin:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        enum:['Admin','Guest','Blogger'],
    },
    isFollowing:{
        type:Boolean,
        default:false,
    },
    isUnFollowing:{
        type:Boolean,
        default:false
    },
    followers:{
        type:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
        ],
    },
    following:{
        type:[
            {
                type:mongoose.Schema.ObjectId,
                ref:"User",
            },
        ],
    },
    active:{
        type:Boolean,
        default:false,
    },
 }, {
     // for real ids of user
        toJSON:{
            virtuals:true,
        },
        toObject:{
            virtuals:true,
        },
        timestamps:true,
    });

    //vrtual method to populate created post
    userSchema.virtual('posts',{
        ref:'Post',
        foreignField:'user',
        localField:'_id',
        });

  //  isAccountVerified:{
  //      type:Boolean,
  //      ddefault:false,
  //  },
  //  accountVerificationToken:String,
  //  accountVerificationTokenExpires:{
  //      type:Date,
  //  },
  //isBlocked:{
  //  type:Boolean,
  //  default:false,},


  //Hash PAssword
  userSchema.pre("save", async function(next){
        //this provides instance of user, hashing
      const salt=await bcrypt.genSalt(10);
      this.password=await bcrypt.hash(this.password,salt);
       next();
  });

  //match password
  userSchema.methods.isPasswordMatched= async function(enteredPassword){
     return await bcrypt.compare(enteredPassword,this.password);
     };
  //compile schema into model
  const User=mongoose.model("User",userSchema);
  module.exports=User;
