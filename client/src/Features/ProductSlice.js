import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products`);
    return res.data;
  }
);

//Add product for ADMIN
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/products`, product);
    return res.data;
  }
);

//Update product for ADMIN
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }) => {
    const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/products/${id}`, data);
    return res.data;
  }
);

//Delete product for ADMIN
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/products/${id}`);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    status: "idle"
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload.product);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex(product => product._id === action.payload.product._id);
        if (index !== -1) {
          state.list[index] = action.payload.product;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter(product => product._id !== action.meta.arg);
      });
  }
});

export default productSlice.reducer;
