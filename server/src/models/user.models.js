import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        password:{
            type:String,
            required:[true,'password is required'],
        },
        refreshtoken:{
            type:String,
        },
    },{timestamps:true}
);

//this is the middle ware which will execute befor saving the document to mongoDB database using mongoose
userSchema.pre('save',function(next){
    //if the password has not been modified then it return to next early
    if(!this.isModified('password')){
        return next();
    }

    //it converts the password to hash if the password has been modified 
    this.password=bcrypt.hashSync(this.password,10);
    next();

});

