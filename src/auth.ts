import { Request, Response, NextFunction } from 'express';
import User  from './models/user';

const jwt = require('jsonwebtoken')


export interface customRequest extends Request {
  user?: User,
  token?: string;
} 

const auth = async(req:customRequest, res:Response, next:NextFunction) => {
try {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  const decoded = jwt.verify(token, 'thishshfkfhg')
  const user = await User.findOne({ _id: decoded._id, 'tokens.token':token })

  // const user = await User.findOne({ _id: decoded._id })

if(!user) {
throw new Error
}

req.user = user
req.token = String(token)
next()

return req;

} catch (error) {
  res.status(401).send({error: "Authentication required"})
 }
}
export default auth;