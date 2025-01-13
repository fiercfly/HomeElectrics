import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const initialState = {
  productList: [],
  cartItem: []
};

// Helper function to safely parse price
const parsePrice = (priceString) => {
  if (typeof priceString === "number") return priceString; // Already a number
  if (!priceString || typeof priceString !== "string") return 0; // Invalid value
  return parseFloat(priceString.replace(/,/g, '')) || 0; // Remove commas and parse as float
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
        const price = parsePrice(action.payload.price); // Safely parse price
        const total = price; // Total = price initially
        state.cartItem = [...state.cartItem, { ...action.payload, qty: 1, total }];
      }
    },

    deleteCartItem: (state, action) => {
      toast("Item deleted successfully");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
    },

    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index >= 0) {
        let qty = state.cartItem[index].qty;
        const price = parsePrice(state.cartItem[index].price); // Safely parse price
        const qtyInc = ++qty;
        state.cartItem[index].qty = qtyInc;

        const total = price * qtyInc; // Recalculate total
        state.cartItem[index].total = total;
      }
    },

    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      if (index >= 0) {
        let qty = state.cartItem[index].qty;
        if (qty > 1) {
          const price = parsePrice(state.cartItem[index].price); // Safely parse price
          const qtyDec = --qty;
          state.cartItem[index].qty = qtyDec;

          const total = price * qtyDec; // Recalculate total
          state.cartItem[index].total = total;
        }
      }
    }
  }
});

export const { setDataProduct, addCartItem, deleteCartItem, increaseQty, decreaseQty } = productSlice.actions;
export default productSlice.reducer;
