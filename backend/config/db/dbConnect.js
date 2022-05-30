const mongoose=require('mongoose');
const dbConnect= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
           //useCreateIndex:true,
          // useFindAndModify:false,
         // useFindAndTopology:true,
           useNewUrlParser:true,
       });
       console.log("Db connection succesful");
    }catch(error){
    console.log(`Error ${error.message}`);
    }
} 
module.exports=dbConnect;