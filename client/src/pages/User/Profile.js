import React,{useEffect, useState} from 'react'
import Lay from '../../components/Layout/Lay'
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../components/context/Auth';
import toast from 'react-hot-toast';

import axios from 'axios';
import { baseUrl } from '../../baseUrl';


const Profile = () => {
  // context
    const [auth, setAuth] = useAuth()
// state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

//get user data
  useEffect(() => {
    const {email, name, phone, address} = auth?.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  }, [auth?.user])

// form function
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const {data} = await axios.put(`${baseUrl}/api/v1/auth/profile`, {
      name,
      email,
      password,
      phone,
      address,
    });
  
    if(data?.error){
      toast.error(data?.error)
    }else{
      setAuth({...auth, user:data?.updatedUser}); //store in user which is in update profile section in authcontroller

      let ls = localStorage.getItem("auth")
      ls = JSON.parse(ls)
      ls.user = data.updatedUser;   // update user come from authcontroller 
      localStorage.setItem('auth', JSON.stringify(ls));
      toast.success("profile Updated Successfully")
    }
  } catch (error) {
    console.log(error)
    toast.error("Something went wrong");
  }
};
  return (
    <Lay title={"Yout-Profile"}>
     <div className='container-fluid p-3 m-3 dashboard'>
        <div className='row'>
        <div className='col-md-3'>
         <UserMenu/>
        </div>
        <div className='col-md-9'>
        <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">USER PROFILE</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              autoFocus
             
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail2"
              placeholder="Enter Your Email "
           
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
          
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail3"
              placeholder="Enter Your Phone"
            
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail4"
              placeholder="Enter Your Address"
           
            />
          </div>
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>
        </form>
      </div>
     </div>
     </div>
     </div>
    </Lay>
  );
};

export default Profile
