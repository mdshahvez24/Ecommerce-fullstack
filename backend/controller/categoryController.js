import categoryModel from "../model/categoryModel.js"
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
    try{
     const {name} = req.body;
     if(!name)  {
        return res.status(401).send({message: 'Name is required'})
     }
     const existingCategory = await categoryModel.findOne({ name });
     if(existingCategory){
          return res.status(200).send({
            success: true,
            message: 'Category Already Exists',
          });
     }
     const category = await new categoryModel({
      name, 
      slug:slugify(name)
   }).save()
     res.status(201).send({succes:true,
        message:'new category created',
        category
     });

     } catch (error) {
        console.log(error)
     res.status(500).send({
        success:false,
        error,
        message:'Error in Category',
     })
    }
};


//update category 

export const updateCategoryController = async (req,res) => {
  try{
   const {name} = req.body
   const {id} = req.params
   const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }); //new true is use for categorypage updation pass 3rd parameter
   res.status(200).send({
      succes:true,
      message:'Category Updated successfully',
      category,
   });
  } catch (error) {
   console.log(error)
   res.status(500).send({
      success: false,
      error,
      message:"Error while updating category",
   });
  }
};

// get all category

export const  categoryController = async (req, res) =>{
   try{
      const category = await categoryModel.find({})
      res.status(200).send({
         success: true,
         message: "All Category List",
         category,
      });

   } catch (error) {
      console.log(error)
      res.status(500).send({
         success: false,
         error,
         message:'Error while getting all catogories',
      });
   }
};

// single category 

export const  singleCategoryControler = async (req, res) =>{
   try{
      const category = await categoryModel.findOne({ slug:req.params.slug})
      res.status(200).send({
         success: true,
         message: "Get Single Category successfully",
         category,
      });

   } catch (error) {
      console.log(error, "hlo")
      res.status(500).send({
         success: false,
         error,
         message:'Error while getting single catogory',
      });
   }
};

//delete category 
export const deleteCategoryController = async (req, res) => {
   try{
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
         success: true,
         message: 'Category Deleted succesfully',
      });
   }catch (error) {
      console.log(error)
      res.status(500).send({
         success: false,
         message:'Error while deleting catogory',
         error,
      });
   }
};


