import JWT from "jsonwebtoken";
import userModel from "../model/userModel.js";

// //Protected Routes token base
// //by using next we can validate to authenticate user nex is use to move next to prevent pause

export const requireSignIn = async(req, res, next) => {
    try{
const decode = JWT.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
);
   req.user = decode;
next();
  } catch (error) {
    console.log(error)
  }
};

// admin access

export const isAdmin = async (req,res,next) => {
try{
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
        return res.status(401).send({
            success: false,
            message: "UnAuthorized Access",
        });
    } else{
        next();
    }
 } catch (error) {
console.log(error);
res.status(401).send({
    success:false,
    error,
    message:"Error in admin middleware"
})
    }
}

