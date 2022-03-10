import express, { Request, Response, NextFunction } from 'express';
import Order, { ItemType } from '../models/order'
const Cart = require("../models/cart")
import User from '../models/user'
import Auth,{ customRequest } from '../auth'

const router =  express.Router()


//CREATE

router.post("/order", Auth, async (req:customRequest, res:Response) => {
    const owner = req.user?._id;

    if (req.body.items.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
      }

    const items: ItemType[]= req.body.items 
    let bill: number = 0;
    items.map((item) => {
        bill += (item.quantity * item.price)
    })
    const newOrder = new Order({
        owner,
        items:req.body.items,
        address:req.body.address,
        bill,

        // status:req.body.status
    });
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET ALL

  router.get("/order", Auth, async (req:customRequest, res:Response) => {
    try {
      const orders = await Order.find({userId: req.user?._id});
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//GET USER ORDERS
router.get("/order/:userId", Auth, async (req:Request, res:Response) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //UPDATE
router.put("/order/:id", Auth, async (req:Request, res:Response) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //DELETE
router.delete("/order/:id", Auth, async (req:Request, res:Response) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });



  export default router;