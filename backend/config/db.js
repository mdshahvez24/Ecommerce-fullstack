// import mongoose from "mongoose";
// import colors from "colors";

// const connectDB = async () => {
//     try{
//         const conn = await mongoose.connect(process.env.DB);
// console.log(`connected to database ${conn.connection.host}`.bgMagenta.white);

//     } catch (error) {
//         console.log(`Error in MongoDB ${error}`.bgRed.white)

//     }
// };

// export default connectDB;




import mongoose from "mongoose";
import  "dotenv/config";

const conString = process.env.DB;
if(!conString) throw new Error ("No database connection string found ");

const connectDB = () => {
    const connection = mongoose.connect(conString);
   

        if (connection){
            console.log("connected to mongoDB");
        }else{
            console.log("cannot connect to mongoose")
        }
    }

export default connectDB;
