import jwt from 'jsonwebtoken';

const authSeller = async (req , res , next) =>{
    const { sellerToken } = req.cookies;
    if(!sellerToken){
        return res.status(401).json({message:"Unauthorized-seller token is not available"});
    }
    try{
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)
        if(tokenDecode.email === process.env.SELLER_EMAIL){
            next()
        }else{
            return res.json({sucess: false , message: "Unauthorized-seller email has not matched"});
        }
        next();
    }catch(error){
        res.json({sucess: false , message: error.message});
    }
}


export default authSeller;