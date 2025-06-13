import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";



// register User 

export const register = async (req, res) => {
    try {
        const { name , email , password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newlyRegisterUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });


        const token = Jwt.sign({id: newlyRegisterUser._id}, process.env.JWT_SECRET, {expiresIn:'7d'})

        res.cookie('token', token, {
            httpOnly:true,                                                          //Prevent Javascript to access cookie
            secure: process.env.NODE_ENV === 'production',                          // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict' ,   // CSRF PROTECTION
            maxAge: 7*24*60*60*1000,                                                //cookie expiration time
        })

        return res.json({sucess:true, user:{email:newlyRegisterUser.email, name:newlyRegisterUser.name , id: newlyRegisterUser._id}})
        
    } catch (error) {
        console.log(error.message);
        res.json({ sucess: false , message: error.message });

        
    }
}

export const login = async (req , res)=>{
    try {
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message: "User does not exist"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = Jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.cookie('token', token, {
            httpOnly:true,                                                          //Prevent Javascript to access cookie
            secure: process.env.NODE_ENV === 'production',                          // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict' ,   // CSRF PROTECTION
            maxAge: 7*24*60*60*1000,                                                //cookie expiration time
        })
        return res.json({sucess:true, user:{email:existingUser.email, name:existingUser.name , id: existingUser._id}})

    } catch (error) {
        console.log(error.message);
        res.json({ sucess: false , message: error.message });   

    }
    
    }


    export const isAuth = async (req , res) => {
        try{
            //const { userId } = req.body;
            const user = await User.findById(req.userId).select("-password");
            return res.json({sucess: true , user})

        }catch(error){
            console.log(error.message);
            res.json({ sucess: false , message: error.message });   
        }
        
    }


    export const logout =async (req , res) => {
        try{
            res.clearCookie('token', {
                httpOnly:true,
                secure:process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict' ,   // CSRF PROTECTION
                maxAge: 7*24*60*60*1000,                                                //cookie expiration time
            });
            return res.json({sucess: true , message: "Logout successfully"});
        }catch(error){
            console.log(error.message);
            res.json({ sucess: false , message: error.message });

        }
    }

