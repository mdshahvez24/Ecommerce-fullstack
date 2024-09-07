import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import axios from 'axios';
import { baseUrl } from "../../baseUrl"
import {Outlet} from 'react-router-dom';
import Spinner from "../Spinner";

export default function AdminRoute(){
    const [ok, setOk] = useState(false) //in auth route we set name ok
    const [auth, setAuth] = useAuth()

useEffect(()=> {
    const authCheck = async() => {
        const res = await axios.get(`${baseUrl}/api/v1/auth/admin-auth`);
        // ,
            // {
            //     headers: {
            //         "Authorization": auth?.token
            //     }
            // }
        // );
        if(res.data.ok){
            setOk(true)
        }else{
            setOk(false)
        }
    }
    if(auth?.token) authCheck()

  }, [auth?.token])
   return ok ? <Outlet/> : <Spinner path=""/>   //outlet is use for nested routing
}




