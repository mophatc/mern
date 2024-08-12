import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signUp =  async (req, res, next) => {
const { username, email, password }  = req.body;
console.log(req.body);
const hashedPassword = bcryptjs.hashSync(password,10);
const newUser = new User({username, email, password : hashedPassword});


try {
   await newUser.save()
    res.status(200).json('User Created successfully');
    
} catch (error) {
    next(errorHandler(550, 'Server error please try later'));

}

};
