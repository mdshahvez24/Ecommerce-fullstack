import React, { useEffect, useState } from 'react'
import Lay from './../../components/Layout/Lay'
import AdminMenu from './../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';

import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import Categoryform from '../../components/form/Categoryform';
import {Modal} from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] =  useState([]);
  const [name,setName] = useState("");
  const [visible, setVisible ] = useState(false)
  const [selected, setSelcted] = useState(null)
  const [updatedName, setUpdatedName] = useState("")

  //handel form
  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const { data } = await axios.post(`${baseUrl}/api/v1/category/create-category`, {
        name,
      })
      if (data?.success){
        toast.success(`${name} is created`);
        getAllCategory();
      }else {
        toast.error(data.message);
      }
    }
    catch(error){
      console.log(error)
      // toast.error('something went wrong in input form')
    }
  }

  // get all catogory

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  //update  catogory

  const handleUpdate = async (e) => {
    e.preventDefault()
    try{
      const { data } = await axios.put(
        `${baseUrl}/api/v1/category/update-category/${selected._id}`,
       { name: updatedName}
      );

      if (data.success) {
        toast.success(`${updatedName} is updated`)
        setSelcted(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory();
      }else{
        toast.error(data.message);
      }
    }
    catch (error) {
      console.log(error)
      // toast.error("Something went wrong ")
    }
  };
  
// delete category

  const handleDelete = async (pId) => {
    try{
      const {data} = await axios.delete(
        `${baseUrl}/api/v1/category/delete-category/${pId}`
      );

      if (data.success) {
        toast.success('category is deleted');

        getAllCategory();
      }else{
     toast.error(data.message);
      }
    }catch(error){
      toast.error("Something went wrong ")
    }
  }
  return (
    <Lay title={"Dashboard - Create Category"}>
       <div className='container-fluid m-3 p-3 dashboard'>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
            </div>
            <div className='col-md-9'>
           <h1>Manage Category</h1>
          
            <div className='p-3 w-50'>
              <Categoryform handleSubmit={handleSubmit} 
               value={name}
               setValue={setName}/>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                      <button
                            className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true) ; setUpdatedName(c.name);
                            setSelcted(c);
                          }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <Categoryform
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
        </div>
</Lay>
  );
};

export default CreateCategory

