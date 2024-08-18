import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:'string',
        required:true,
        unique:'true'
    },
    email:{
        type:'string',
        required:true,
        unique:true
    },
    password:{
        type:'string',
        required:true
    },
    avatar:{
        type:'string',
        default:"https://static.vecteezy.com/system/resources/previews/026/630/551/original/profile-icon-symbol-design-illustration-vector.jpg"
        
    },
    
}, {timestamps: true});
const User = mongoose.model('User', userSchema);
export default User;

