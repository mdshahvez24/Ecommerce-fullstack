import express from "express"
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController, testController, updateProfileController } from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

//router object
const route = express.Router();

// routing
// REGISTER || Method POST

route.post("/register", registerController)

//LOGIN || POST

route.post("/login", loginController)

// Forgot password || Post

route.post('/forgot-password', forgotPasswordController)

//test routes

route.get("/test", requireSignIn, isAdmin, testController)

//protected user route auth

route.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

//protected Admin route auth
// here we use 2 middleware  

route.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

// // update profile
route.put("/profile", requireSignIn, updateProfileController)

// //orders

route.get("/orders", requireSignIn, getOrdersController);

// //all orders
route.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// //order status update

route.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController)

export default route;


