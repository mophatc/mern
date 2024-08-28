import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken';

export const verifyToken = (req,res, next)=>{
    const token = req.cookies.mophatToken;
    if(!token) return next(errorHandler(401, "Not recognized"));

    jwt.verify(token, process.env.JWT_WEBTOKEN, (err, user)=>{
        if(err) return next(errorHandler(403, 'Forbidden'));
        req.user = user;
        next();
    })
}