import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const initialState = {
  productList: [],
  cartItem: []
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },

    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Item already in cart");
      } else {
        toast("Item added successfully");
        const total = parseFloat(action.payload.price); // Ensure price is a number
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total }
        ];
      }
    },

    deleteCartItem: (state, action) => {
      toast("Item deleted successfully");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        state.cartItem.splice(index, 1);
      }
    },

    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        const item = state.cartItem[index];
        item.qty += 1; // Increment quantity
        item.total = parseFloat(item.price) * item.qty; // Update total
      }
    },

    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index !== -1) {
        const item = state.cartItem[index];
        if (item.qty > 1) {
          item.qty -= 1; // Decrement quantity
          item.total = parseFloat(item.price) * item.qty; // Update total
        }
      }
    }
  }
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty
} = productSlice.actions;

export default productSlice.reducer;
