import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get cart items
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (userId) => {
    try{
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/cartadd`, 
        { headers: {userid: userId}}
      );
      return response.data;
    }
    catch(error){
      console.log(error);
    }
  }
);

//Add to cart (sends data to backend)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData) => {
    try {
      const { productId, title, price, color, quantity, userId, imageUrl} = cartData;  
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/cartadd`,
          { productId, title, price, imageUrl, color, quantity},
        { headers: { userid: userId } }
      );
      const cartItem = response.data.cartitem;
      const msg = response.data.msg;

      return {cartItem, msg};
    } 
    catch (error) {
      console.log(error);
      const msg = error.response?.data?.msg;
      return { msg };
    }
  }
);

// Delete cart item
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (cartId, userId) => {
    try{
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/cartadd/${cartId}`,
        { headers: {userid: userId}}
      );
      return cartId;
    }
    catch(error){
      console.log(error);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId) => {
    await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/cartclear`,
      {
        headers: { userid: userId },
      }
    );
    return [];
  }
);



// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    status: "idle",
    cart: [],
    msg: "",
  },

  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
    // Add to cart
    .addCase(addToCart.pending, (state) => {
      state.status = "pending";
    })
    .addCase(addToCart.fulfilled, (state, action) => {
      state.status = "Success";
      if (action.payload?.cartItem) {
        state.cart.push(action.payload.cartItem);
      }
      state.msg = action.payload?.msg;
    })
    .addCase(addToCart.rejected, (state) => {
      state.status = "Rejected";
    })

    // Get cart
    .addCase(getCart.pending, (state) => {
      state.status = "pending";
    })
    .addCase(getCart.fulfilled, (state, action) => {
      state.status = "Success";
      // backend returns array directly
      state.cart = action.payload || [];
    })
    .addCase(getCart.rejected, (state) => {
      state.status = "Rejected";
    })

    // Delete item
    .addCase(deleteCartItem.fulfilled, (state, action) => {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload
      );
    })
    .addCase(clearCart.fulfilled, (state) => {
       state.cart = [];
});

  },
});

export default cartSlice.reducer;