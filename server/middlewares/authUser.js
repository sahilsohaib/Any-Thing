import jwt from "jsonwebtoken";


const authUser = async (req , res , next) =>{
    const {token} =req.cookies;

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    
    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if(tokenDecode.id){
            // req.body.userId = tokenDecode.id;
            req.userId = tokenDecode.id;
            
        }else{
            return res.json({sucess: false , message: "Unauthorized"});
        }
        next();
    }catch(error){
        res.json({sucess: false , message: error.message});
       
    }
}

export default authUser;