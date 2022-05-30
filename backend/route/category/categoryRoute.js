const express= require('express');
const { createCategoryCtrl, fetchAllCategoryCtrl , fetchCategoryCtrl} = require('../../controllers/category/categoryCtrl');
const authMiddleware = require('../../middlewares/auth/authMiddleware');

const categoryRoute=express.Router();

categoryRoute.post("/",authMiddleware,createCategoryCtrl);
categoryRoute.get("/",authMiddleware,fetchAllCategoryCtrl);
categoryRoute.get("/:id",authMiddleware,fetchCategoryCtrl);

module.exports=categoryRoute;