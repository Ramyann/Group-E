import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filters: [],
  },
  reducers: {
    addCartItem(state, action) {

      const newItem = action.payload;
      const existingItemIndex = state.filter.findIndex(
        (item) => item === newItem
      );

      if (existingItemIndex !== -1) {
        state.filter[existingItemIndex] = newItem;
      } else {
        state.filter.push(newItem);
      }

      try {
        localStorage.setItem("cartData", JSON.stringify(state.filter));
      } catch (error) {
        console.error("Error saving cart data to localStorage:", error);
      }
    },

    updateCartItem(state, action) {
      const { newItem } = action.payload;
      const cartItem = state.carts.findIndex(
        (item) =>
          item.client_id === newItem.client_id &&
          item.sku_id === newItem.sku_id &&
          item.tier === newItem.tier &&
          JSON.stringify(item.sku_variant_ids) ===
            JSON.stringify(newItem.sku_variant_ids)
      );

      if (cartItem != -1) {
        state.carts[cartItem] = newItem;
        try {
          localStorage.setItem("cartData", JSON.stringify(state.carts));
        } catch (error) {
          console.error("Error saving cart data to localStorage:", error);
        }
      }
    },

    // reorder
    reorder(state, action) {
      const reorderedItems = action.payload;

      state.carts = [];

      reorderedItems.forEach((item) => {
        state.carts.push(item);
      });

      try {
        localStorage.setItem("cartData", JSON.stringify(state.carts));
      } catch (error) {
        console.error("Error saving cart data to localStorage:", error);
      }

      // Update the stored quantity
      // updateStoredQuantity(state);
    },

    removeCartItem(state, action) {
      const itemToRemove = action.payload;

      const itemIndex = state.carts.findIndex(
        (item) =>
          item.client_id === itemToRemove.client_id &&
          item.sku_id === itemToRemove.sku_id &&
          item.tier === itemToRemove.tier &&
          JSON.stringify(item.sku_variant_ids) ===
            JSON.stringify(itemToRemove.sku_variant_ids)
      );

      if (itemIndex !== -1) {
        state.carts.splice(itemIndex, 1);
        try {
          localStorage.setItem("cartData", JSON.stringify(state.carts));
        } catch (error) {
          console.error("Error saving cart data to localStorage:", error);
        }
      }
    },

    clearCart(state) {
      state.carts = [];
      try {
        localStorage.removeItem("cartData");
        localStorage.removeItem("storedQuantity");
      } catch (error) {
        console.error("Error clearing cart data from localStorage:", error);
      }
      state.storedQuantity = {};
      updateStoredQuantity(state);
    },
  },
});

export const {
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
  updateStoredQuantity,
  reorder,
} = filterSlice.actions;
export default filterSlice.reducer;
