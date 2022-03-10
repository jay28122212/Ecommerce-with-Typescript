import mongoose from "mongoose";
import { Schema, model, Types } from "mongoose";

// const ObjectID = Schema.Types.ObjectId

export interface cartInterface extends Document {
  owner: Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  items: CartType[];
  bill: number;
}

export interface CartType {
  itemId: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
}
const cartSchema = new Schema<cartInterface>(
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
  },
  {
    timestamps: true,
  }
);

export const Cart = model<cartInterface>("Cart", cartSchema);

// export Cart;
