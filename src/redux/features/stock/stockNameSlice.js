import { createSlice } from '@reduxjs/toolkit';

const stockNameSlice = createSlice({
  name: 'stockNameSlice',
  initialState: {
    stockName: '',
  },
  reducers: {
    selectStock: (state, action) => {
      state.stockName = action.payload;
    },
  },
});

export const { selectStock } = stockNameSlice.actions;

export default stockNameSlice.reducer;
