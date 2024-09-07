import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";

import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from "../controller/productController.js";
// import braintree from "braintree";

const route = express.Router();

//routes
route.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//routes
route.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get all products

route.get("/get-product", getProductController);

//single product
route.get("/get-product/:slug", getSingleProductController);

// //get photo
route.get("/product-photo/:pid", productPhotoController);

//delete product
route.delete("/delete-product/:pid", deleteProductController);

//filter product
route.post("/product-filters", productFiltersController);

//product count
route.get("/product-count", productCountController);

//product per page
route.get("/product-list/:page", productListController);

// search product
route.get("/search/:keyword", searchProductController);

// //similar product
route.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
route.get("/product-category/:slug", productCategoryController);

// //payment gateway route
// //token

route.get('/braintree/token', braintreeTokenController)

// // payment route

route.post('/braintree/payment', requireSignIn, braintreePaymentController)


export default route;
