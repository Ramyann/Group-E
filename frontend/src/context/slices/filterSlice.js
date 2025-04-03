import { createSlice } from "@reduxjs/toolkit";
import { setUser } from "./userSlice";

const initialState = {
  filters: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState:initialState,
  reducers: {
    addFilter(state, action) {
      state.filters.push(action.payload);
    },
    removeFilter(state, action) {
      state.filters.filter((item) => action.payload !== item);
    },
    clearFilters() {
      [];
    },
    
  },
  // extraReducers: (builder) =>{
  //   builder.addCase(setUser, )
  // }
});

export const { addFilter, removeFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;