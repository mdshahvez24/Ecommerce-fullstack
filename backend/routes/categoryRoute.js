import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryControler, updateCategoryController } from "../controller/categoryController.js";

const route = express.Router()

// routes 
// create category 
route.post("/create-category",
    requireSignIn, 
    isAdmin,
    createCategoryController);

//update category
route.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController)


//get All category

route.get("/get-category", categoryController)

//single category
route.get("/single-category/:slug",singleCategoryControler)

// delete category

route.delete(
    "/delete-category/:id", 
    requireSignIn, 
    isAdmin, 
    deleteCategoryController
);

export default route;