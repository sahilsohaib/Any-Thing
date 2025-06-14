

import jwt from 'jsonwebtoken'; 


// seller login : /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('sellerToken', token, {
                httpOnly: true,                                                         // Prevent JavaScript access
                secure: process.env.NODE_ENV === 'production',                          // Use secure cookies in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',    // CSRF Protection
                maxAge: 7 * 24 * 60 * 60 * 1000,                                         // Cookie expiration: 7 days
            });

            return res.json({ success: true, message: "Login successfully" });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}


// Check Auth : /api/seller/is-auth

export const isSellerAuth =async (req , res)=>{
    try{
        return res,json({sucess: true})

    }catch(error){
        console.log(error.message);
        res.json({ sucess:false , message: error.message});
    }
}


// seller logout : /api/seller/logout

export const sellerLogout = async (req, res)=>{
    try{
        res.clearCookie('sellerToken', {
            httpOnly: true,                                                         // Prevent JavaScript access
            secure: process.env.NODE_ENV === 'production',                          // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',    // CSRF Protection
            maxAge: 7 * 24 * 60 * 60 * 1000,                                         // Cookie expiration: 7 days
        });
        return res.json({ sucess: true, message: "Logout successfully" });
    }catch(error){
        console.log(error.message);
        res.json({ sucess: false, message: error.message });
    }
}


