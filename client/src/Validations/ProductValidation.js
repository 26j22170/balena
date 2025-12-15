import * as yup from "yup";

export const ProductSchema = yup.object.shape({
    productID: yup.string().required("Product ID is required"),
    productName: yup.string().required("Product name is required"),
    price: yup.number().required("Price is required"),
    color: yup.string().required("Color is required"),
    
});