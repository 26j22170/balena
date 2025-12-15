import mongoose from "mongoose"


const CartSchema = new mongoose.Schema(
   {
     userId: { type: String, required: true },
     productId: { type: String, required: true },
     title: { type: String, required: true },
     price: { type: Number, required: true },
     imageUrl: { type: String, required: true },
     color: { type: String, default: "default" },
     quantity: { type: Number, default: 1 },
   },
   { timestamps: true, collection: "carts" }
 );


export default mongoose.model("cart",CartSchema);