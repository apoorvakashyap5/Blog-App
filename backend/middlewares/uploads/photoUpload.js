const multer=require('multer');
const sharp=require('sharp');
const path=require('path');

//storage using memory/server
const multerStorage=multer.memoryStorage();

//file type checking
//cb is callback
const multerFilter=(req,file,cb)=>{
    //check file type
    if(file.mimetype.startsWith("image")){
        cb(null,true) //null means succesful
    }
    else{
        //rejected files
        cb({
            message:"Unsupported file format",
        },false);
    }

};

const photoUpload=multer({
    storage:multerStorage,
    fileFilter:multerFilter,
    limits:{fileSize:1000000},
});


//================================================================//
//image resizing // will act as middleware
const profilePhotoResize=async (req,res,next)=>{
      //check if file is not there
      if(!req.file){ return next();}
      req.file.filename = `user=${Date.now()}-${req.file.originalname}`; //no duplicate files allowed
     // console.log('Resizing', req.file);
     await sharp(req.file.buffer)
     .resize(250,250).toFormat('jpeg').jpeg({quality:90})
     .toFile(path.join(`public/images/profile/${req.file.filename}`));
     next();
};


//===========================================================================
//postPhoto

//================================================================//
//image resizing // will act as middleware
const postImgResize=async (req,res,next)=>{
    //check if file is not there
    if(!req.file){ return next();}
    req.file.filename = `user=${Date.now()}-${req.file.originalname}`; //no duplicate files allowed
   // console.log('Resizing', req.file);
   await sharp(req.file.buffer)
   .resize(500,500).toFormat('jpeg').jpeg({quality:90})
   .toFile(path.join(`public/images/posts/${req.file.filename}`));
   next();
};


module.exports={photoUpload, profilePhotoResize ,postImgResize};