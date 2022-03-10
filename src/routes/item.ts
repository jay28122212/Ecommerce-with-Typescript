import express, { Request, Response, NextFunction } from 'express';
import Item from '../models/item'
import Auth,{ customRequest } from '../auth'
import { ItemDTO, ItemType } from '../models/order';
const router =  express.Router()


//Create a new item

// interface itemDTOKeys {

// }


router.post('/items',Auth, async(req:customRequest, res:Response) => {
    try {
    const newItem = new Item({
        ...req.body,
        owner: req.user?._id
    })
       await newItem.save()
       res.status(201).send(newItem)
    } catch (error) {
    res.status(400).send({message: "error"})
    }
    })

    //Fetch all items

    router.get('/items', async(req:Request, res:Response) => {
        try {
          const items = await Item.find({})
          res.status(200).send(items)
        } catch (error) {
          res.status(400).send(error)
        }
        })

        // Fetch all items with id 

        router.get('/items/:id', async(req:Request, res:Response) => {
            try{
               const item = await Item.findOne({_id: req.params.id})
            if(!item) {
               res.status(404).send({error: "Item not found"})
            }
               res.status(200).send(item)
            } catch (error) {
               res.status(400).send(error)
            }
            })

            //Update an item

            router.patch('/items/:id', Auth, async(req, res) => {
               const updates = Object.keys(req.body)
               const allowedUpdates = ['name', 'description', 'category', 'price']
               const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
                  if(!isValidOperation) {
                    return res.status(400).send({ error: 'invalid updates'})
               }
               try {
                 const item  = await Item.findOne({ _id: req.params.id})
                 if(!item){
                     return res.status(404).send()
                 }
                 updates.forEach((update) => (item as any)[update] = req.body[update])
                 await item.save()
                 res.send(item)
               } catch (error) {
               res.status(400).send(error)
               }
               })

                // Delete an item

                router.delete('/items/:id', Auth, async(req:Request, res:Response) => {
                    try {
                    const deletedItem = await Item.findOneAndDelete( {_id: req.params.id} )
                       if(!deletedItem) {
                        res.status(404).send({error: "Item not found"})
                    }
                       res.send(deletedItem)
                    } catch (error) {
                       res.status(400).send(error)
                    }
                    })


                    export default router;