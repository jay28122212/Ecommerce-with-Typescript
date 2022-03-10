
import {  Document,Schema, model} from 'mongoose';

import validator from 'validator';
// const validator = require('validator');

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';

interface User extends Document{
  _id?: mongoose.Types.ObjectId;
   name:String;
   email:String
   password:string
   generateAuthToken():string
   // findByCredentials():string

 }

//  interface UserModel extends User  {
//    myStaticMethod(): User;
//  }




const userSchema = new Schema <User>({
    name: {
       type: String,
       required: true,
       trim: true,
       lowercase: true
     },
    email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
         validate( value:string ) {
               if( !validator.isEmail( value )) {
                    throw new Error( 'Email is invalid' )
                     }
                }
      },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value:String) {
           if( value.toLowerCase().includes('password')) {
           throw new Error('password musn\'t contain password')
          }
       }
    },
  
    }, {
    timestamps: true
    })

    //Generate auth token
    userSchema.methods.generateAuthToken = async  function() :Promise<String> {
        const user = this
         const token=jwt.sign({_id:user._id.toString()},'thishshfkfhg')
  
        return token
     }

 

     //Hash plain password before saving

     userSchema.pre('save', async function(next) {
        const user = this
           if (user.isModified('password')) {
           user.password = await bcrypt.hash(user.password, 8)
        }
          next()
        })

        //login in user

      //   userSchema.myStaticMethod.findByCredentials = async (email:string, password:string) :Promise<User>  => {

      //   const findByCredentials = async (email:string, password:string) :Promise<User>  => {
      //       const user = await User.findOne({ email })
      //       if (!user) {
      //         throw new Error('Unable to log in')
      //       }
      //        const isMatch = await bcrypt.compare(password, user.password)
      //       if(!isMatch) {
      //          throw new Error('Unable to login')
      //       }
      //          return user
      //       }

      // userSchema.static('myStaticMethod', findByCredentials)


    const User = model <User>('User', userSchema)
// export {User};
export default User;
