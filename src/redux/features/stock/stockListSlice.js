import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStockListData = createAsyncThunk(
  'stockList/fetchStockList',
  async () => {
    const url =
      'https://yahoo-finance15.p.rapidapi.com/api/v2/markets/tickers?type=STOCKS&page=1';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '121a717964mshf344de340e7b062p158042jsna9f8ad2d1761',
        'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch stock list');
      }
      const data = await response.json();
      return data.body;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const stockListSlice = createSlice({
  name: 'stockList',
  initialState: {
    stocksList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockListData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockListData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stocksList = action.payload;
      })
      .addCase(fetchStockListData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('error in redux fetching', action.payload);
      });
  },
});

export default stockListSlice.reducer;
