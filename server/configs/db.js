import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// const connectDB = async () => {
//     try {
//         mongoose.connection.on("connected", () => {
//             console.log("Database connected");
//         });

//         await mongoose.connect(process.env.MONGODB_URI);
//     } catch (error) {
//         console.error(error.message);
//     }
// };

// export default connectDB;

//export a function that connect to db
const db =() =>{

mongoose
.connect(process.env.MONGODB_URI)

.then(()=>{
    console.log("connected to mongodb");
})

.catch((err)=>{
    console.log("error connecting to mongodb");
});

};


export default db