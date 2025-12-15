import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import UserModel from "./Models/UserModel.js";
import ProductModel from "./Models/ProductModel.js";
import CartModel from './Models/CartModel.js';

dotenv.config();
const app=express();
app.use(express.json()); 
app.use(cors()); 
const conncetString=`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@balena.w1fd5vv.mongodb.net/${process.env.DB_NAME}?appName=balena`; 
mongoose.connect(conncetString); 

//express route: to add user data to user info collection in DB: 
app.post('/registerUser',async(req,res)=>
    { try
        {
             const {firstName, lastName ,email,password}=req.body;
             const hashpasswrod= await bcrypt.hash(password,10) 
             const user= new UserModel({firstName, lastName ,email,password:hashpasswrod}) 
             await user.save(); 
             res.send({ user:user, msg:"added."});
             } 
    catch(error)
    { console.log(error) 
        res.status(401).send({msg:'An error accur'}) 
    } 
}) 
///express method for handle http post request and authenticate a user 
app.post("/login", async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(401).send({msg: "User not found"});
        }
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass){
            return res.status(401).send({msg: "Incorrect Password"});
        }
        res.status(200).send({
            user,
            isAdmin: user.role === "admin",
            isLogin: true,
            msg: user.role === "admin" ? "Admin login successfully" : "User login successfully",
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({msg: "An error occured"})
    }
});

//add items from shop to database
const authMiddleware = (req, res, next) => {
    const userId = req.headers["userid"]; // We'll send userId in header
      if (!userId) return res.status(401).send({ msg: "Unauthorized" });
       req.userId = userId;
       next();
  };

  //userId,productId,title,price,quantity
app.post("/cartadd", authMiddleware, async (req, res) => {
  try {
    const { productId, title, price, imageUrl, color, quantity } = req.body;

    const existingItem = await CartModel.findOne({
      userId: req.userId,
      productId,
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json({
        msg: "Cart updated",
        cartitem: existingItem,
      });
    }

    const cartitem = new CartModel({
      userId: req.userId,
      productId,
      title,
      price,
      imageUrl,
      color,
      quantity,
    });

    await cartitem.save();
    res.status(201).json({ msg: "Added to Cart", cartitem });

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});


// GET all cart items
app.get("/cartadd", authMiddleware, async (req, res) => {
  try {
    const cartItems = await CartModel.find({ userId: req.userId });
    res.status(200).json(cartItems);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE a cart item by ID
app.delete("/cartadd/:id", authMiddleware, async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Cart item deleted" });
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET USERS (exclude admin himself)
app.get("/users", async (req, res) => {
  try {
    const adminId = req.headers["userid"];

    const users = await UserModel.find({
      _id: { $ne: adminId }
    });

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Failed to fetch users" });
  }
});


app.delete("/users/:id", async(req, res) => {
    await UserModel.findByIdAndDelete(req.params.id);
    res.send({msg: "User deleted"});
});

        
// DELETE ALL cart items for a user
app.delete("/cartclear", authMiddleware, async (req, res) => {
  try {
    await CartModel.deleteMany({ userId: req.userId });
    res.status(200).json({ msg: "Cart cleared" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});


// UPDATE USER (email + password) by Admin
app.put("/users/:id", async (req, res) => {
  try {
    const { email, password } = req.body;
    const updateData = { email };

    // If password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedUser) return res.status(404).send({ msg: "User not found" });

    res.status(200).send({ msg: "User updated", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ msg: "Failed to fetch products" });
  }
});

// Add product for ADMIN
app.post("/products", async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    const product = new ProductModel({ name, price, imageUrl });
    await product.save();
    res.status(201).send({ msg: "Product added", product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Failed to add product" });
  }
});

// Update product for ADMIN
app.put("/products/:id", async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { name, price, imageUrl },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).send({ msg: "Product not found" });
    res.status(200).send({ msg: "Product updated", product: updatedProduct });
  } 
  catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Failed to update product" });
  }
});

// Delete product for ADMIN
app.delete("/products/:id", async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "Product deleted" });
  } 
  catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Failed to delete product" });
  }
});


app.listen(process.env.PORT,()=>{
     console.log('You are connected');
     })