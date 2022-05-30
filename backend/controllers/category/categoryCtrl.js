const expressAsyncHandler = require("express-async-handler");
const { json } = require("express/lib/response");
const Category = require("../../model/category/Category");

//----------------------------------------------------------------------
//create
const createCategoryCtrl=expressAsyncHandler(async(req,res)=>{
    try{
        const category= await Category.create({
            user:req.user._id,
        title:req.body.title,
 }); res.json(category);
    }catch(error){res.json(error);}
});


//------------------------------------------------------------------------------
//fetch
const fetchAllCategoryCtrl= expressAsyncHandler(async(req,res)=>{
  try{  
      const category=await Category.find({}).populate('user').sort("-createdAt");
  res.json(category);
}catch(error){res.json(error);}
});


//-------------------------------------------------------------------------
//fetch single category

const fetchCategoryCtrl=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
       
        const category=await Category.findById(id);
        res.json(category);
    }
    catch(error){
        res.json(error);
    }
});

//update
const updateCategoryCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findByIdAndUpdate(
        id,
        {
          title: req?.body?.title,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(category);
    } catch (error) {
      res.json(error);
    }
  });

  //delete category
const deleteCateoryCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findByIdAndDelete(id);
  
      res.json(category);
    } catch (error) {
      res.json(error);
    }
  });

module.exports={createCategoryCtrl,fetchAllCategoryCtrl, fetchCategoryCtrl, updateCategoryCtrl, deleteCateoryCtrl};