import express from "express";
import {sellerLogin,isSellerAuth,sellerLogout} from "../controllers/sellerController.js";
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

// sellerRouter.post('/register', register)

sellerRouter.post('/login', sellerLogin);

sellerRouter.get('/is-Auth', authSeller, isSellerAuth );

sellerRouter.get('/logout', authSeller, sellerLogout);


export default sellerRouter 