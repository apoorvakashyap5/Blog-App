const mongoose=require('mongoose');


const postSchema=new mongoose.Schema({
    title:{
        type:String,
       required:true,
        trim:true,
    },

    category:{
        type:String,
        required:[true, "Post category is required"],
        
    },

    isLiked:{
        type:Boolean,
        default:false,
    },
    //numViews:{type:Number, defalut:0},
    isDisliked:{
        type:Boolean,
        default:false,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
},],
   //likes:[{
//type:mongoose.Schema.Types.ObjectId,
   // ref:"User"},],
disLikes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},],

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
},
 description:{
     type:String,
   required:true,
 },
 image:{
     type:String,
     default:"https://cdn.pixabay.com/photo/2015/06/02/12/59/book-794978__340.jpg",
 },
},
{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true,
    
});
//populate comments 
postSchema.virtual('comments',{
    ref:"Comment",
    foreignField:"post",
    localField:"_id"
});

//compile
const Post=mongoose.model("Post",postSchema);
module.exports=Post;