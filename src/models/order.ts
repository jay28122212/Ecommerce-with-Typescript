import {  Schema, model, Types} from 'mongoose';
const ObjectID = Schema.Types.ObjectId;

export interface order {
  owner:Types.ObjectId;
    items: ItemType[];
  bill: number;
  address: object;
  status: string;
}

export interface ItemDTO {
  name: string;
  description: string;
  category: string;
  price: number;
}

export interface ItemType {
  itemId: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
}
const orderSchema = new Schema<order>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        itemId: {
          type: Types.ObjectId,
          ref: "Item",
          required: true,
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },

        price: Number,
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
);
const Order = model<order>("Order", orderSchema);

// module.exports = Order

export default Order;
