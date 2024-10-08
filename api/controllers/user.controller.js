import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryprtjs from 'bcryptjs'

export const test = (req, res)=>{
    res.json({
        message:'API WORKING MOM'
    })
}

export const updateUserInfo =  async (req,res, next)=>{

    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account  '))
        try {
            if(req.body.password){
                req.body.password = bcryprtjs.hashSync(req.body.password, 10);
            }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        }

        
    }, {new:true})


    const {password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);

        } catch (error) {

            next(error)
            
        }

}

export const deleteUser = async (req, res, next)=>{
if (req.user.id!== req.params.id)return next(errorHandler(401, 'You can only Delete Your Own ACCOUNT'))
    try {

        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('mophatToken')
        res.status(200).json({message:'Your Account has been deleted Successfully'})
        
    } catch (error) {
        next(error)
    }
}