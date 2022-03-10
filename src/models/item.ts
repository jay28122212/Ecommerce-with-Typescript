import {  Schema, model, Types} from 'mongoose';


interface item {
   owner:Types.ObjectId;
   name:string;
   description:string
   category:string
   price:number

 }

const itemSchema = new Schema <item>({
    owner : {
      type: Schema.Types.ObjectId,
       required: true,
       ref: 'User'
    },
    name: {
       type: String,
       required: true,
       trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
       type: String,
       required: true
    },
    price: {
       type: Number,
       required: true
    }
    }, {
    timestamps: true
    })


    const Item = model <item>('Item', itemSchema)
// module.exports = Item

export default Item;