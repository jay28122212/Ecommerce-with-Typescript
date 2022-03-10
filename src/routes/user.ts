import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'

import User from '../models/user'
import Auth from '../auth'


const router =  express.Router()


interface customRequest extends Request {
    user?: User,
    token?: string;
  } 

//signup

router.post('/users', async (req:Request, res:Response) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token:string = await user.generateAuthToken()
        res.status(201).send({user, token})
        
    } catch (error) {
        res.status(400).send(error)
    }
    })

    //login
    router.post('/users/login',async (req:Request, res:Response) => {
        try {
        //   const user:User = await User.findByCredentials(req.body.email,req.body.password)
            const user = await User.findOne({ email:req.body.email })

            if (!user) {
                throw new Error('Unable to log in')
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password)

            if(!isMatch) {
                throw new Error('Unable to login')
             }

            const token:string = await user.generateAuthToken()
            res.send({ user, token})
        } catch (error) {
            res.status(400).send(error)
        }
    })


        // logout

        // router.post('/users/logout', Auth, async (req:, res:Response) => {
        //     try {
        //         req.user.tokens =  req.user.tokens.filter((token:string) => {
        //        return token.token !== req.token
        //       })
        //         await req.user.save()
        //         res.send()
        //     } catch (error) {
        //         res.status(500).send()
        //     }
        //     })


        //     //Logout All 

        //     router.post('/users/logoutAll', Auth, async(req:customRequest, res:Response) => {
        //         try {
        //         //    req.user.tokens = []
        //            await req.user.save()
        //            res.send()
        //         } catch (error) {  
        //            res.status(500).send()
        //         }
        //         })
                // module.exports = router
                export default router;