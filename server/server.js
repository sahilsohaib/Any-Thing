import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import db from "../server/configs/db.js";
import dotenv from "dotenv";


//routes import
import userRouter from '../server/routes/userRoute.js'
import sellerRouter from '../server/routes/sellerRoute.js'



dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

db();


const allowedOrigins= ["http://localhost:5173"];


//Middlewere configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true  
}));



app.get("/", (req, res) => {
    res.send("API IS WORKING");
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/seller', sellerRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});