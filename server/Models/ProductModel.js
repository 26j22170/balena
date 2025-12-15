import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },},
    {timestamps: true, collection: "products"}
)

const ProductModel = mongoose.model("product", ProductSchema);
export default ProductModel;
