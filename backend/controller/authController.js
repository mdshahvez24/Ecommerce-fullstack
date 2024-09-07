import "dotenv/config";
import userModel from '../model/userModel.js';
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from "jsonwebtoken";
import orderModel from "../model/orderModel.js";


export const registerController = async(req,res) => {
try{
    const {name, email, phone, password, address,answer} = req.body;
 //validations
    if(!name){
        return res.send({message:'Name is required'})
    }
    if(!email){
        return res.send({message:'Email is required'})
    }
    if(!password){
        return res.send({message:'Password is required'})
    }
    if(!phone){
        return res.send({message:'Phone no is required'})
    }
    if(!address){
        return res.send({message:'Addresss is required'})
    }
    if(!answer){
        return res.send({message:'Answer is required'})
    }

    // Check user 

const existingUser = await userModel.findOne({email })

    // Existing user
     if(existingUser){
        return res.status(200).send({
            success:false,
            message:"Already register please login",
        });
     }

     //register user

     const hashedPassword = await hashPassword(password);

     //save passwrd

     const user = await new userModel({
        name,
        email,
        phone,
        address,
        password:hashedPassword,
        answer,
    }).save();

    // const data = await user.save();
    // console.log(data);
    
     res.status(201).send({
          success: true,
          message: 'User Register Sucessfully',
          user,
     });

} catch (error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in Registeration',
        error

    });
}
};

// POST LOGIN

export const loginController = async(req, res) => {
     try{ 
         //destructuring email and psswd
        const { email, password } = req.body

      // validation
     if(!email || !password){
        return res.status(404).send({
            success:false,
            message:'Invalid email or password'
        })
     }

// now we check password but we check user first

const user = await userModel.findOne({email})
if(!user){
    return res.status(404).send({
        success:false,
        message:'Email is not registerd',
    });
}

const match = await comparePassword(password, user.password)

if(!match){
    return res.status(200).send({
        success:false,
        message:'Invalid Password'
    });
}

// token create

const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { 
    expiresIn:'30d',
});
return res.status(200).send({
    success:true,
    message:'login successfully',
    user:{
        _id: user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
        role:user.role,
    },
  token,
});

} catch (error) {
res.status(500).send({
    success:false,
    message:'Error in login',
    error,
});
    }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        
        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }
        if (!answer) {
            return res.status(400).send({ message: 'Answer is required' });
        }
        if (!newPassword) {
            return res.status(400).send({ message: 'New Password is required' });
        }

        // Check validation
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong Email Or Answer'
            });
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });

        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        });
    }
};


//testcontroller  
export const testController = (req, res) => {
    res.send('protected Route');
    
    try {
        res.send('protected Route');
    } catch(error) {
        console.log(error)
        res.send({error})
    }
};

// update profile

export const updateProfileController = async (req, res) => {
    try{
   const {name, email, password, address, phone} = req.body
   const user = await userModel.findById(req.user._id)

    // password 
    if(password && password.length < 6){
        return res.json({error:'Password is required and 6 character long'})
    }
//  hass paasword

const hashedPassword = password ? await hashPassword(password) : undefined;

    const updatedUser = await userModel.findByIdAndUpdate(req.user._id,{
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
    }, 
    {new:true}
);
  res.status(200).send({
    success:true,
    message: "Profile updated successfully",
    updatedUser,
  })

     } catch (error) {
     console.log(error)
       res.status(400).send({
        success:false,
        message: "Error while updating Profile",
        error
       });
     }
};

//order 
export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };

// All order 

export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };

// // order status 

export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updating Order",
        error,
      });
    }
  };
  