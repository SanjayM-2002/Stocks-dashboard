import { createSlice } from '@reduxjs/toolkit';

const stockNameSlice = createSlice({
  name: 'stockNameSlice',
  initialState: {
    stockDetails: {},
  },
  reducers: {
    selectStock: (state, action) => {
      state.stockDetails = action.payload;
    },
  },
});

export const { selectStock } = stockNameSlice.actions;

export default stockNameSlice.reducer;
